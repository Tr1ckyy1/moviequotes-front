<template>
  <MainModal :modalOpen="quotesStore.editQuoteModal.visible" @close-modal="closeModal">
    <form
      @submit="submit"
      class="bg-[#0D0B14] h-full lg:max-h-[50rem] overflow-y-auto scrollbar-none lg:ml-[calc(25%_+80px)] xl:ml-[calc(25%_+16px)] lg:rounded-xl lg:w-[55%]"
    >
      <header class="flex items-center justify-between gap-2 p-7 border-b border-[#EFEFEF33]">
        <TrashIcon @click="deleteQuote" class="lg:hover:brightness-75 cursor-pointer" />
        <h1 class="capitalize font-semibold text-xl">
          {{ t('show.edit_quote') }}
        </h1>
        <XIcon @click="closeModal" class="lg:cursor-pointer" />
      </header>

      <main class="p-7 space-y-6">
        <section class="flex items-center gap-5">
          <div class="w-10 h-10 lg:h-14 lg:w-14 shrink-0 rounded-full">
            <img
              v-if="userData?.profile_image"
              :src="userData?.profile_image"
              class="object-cover rounded-full h-full w-full"
            />
            <img v-else src="@/assets/avatar.png" class="rounded-full object-cover h-full w-full" />
          </div>
          <h2 class="break-all">{{ userData.username }}</h2>
        </section>

        <div class="relative">
          <Field
            :value="quoteData?.quote.en"
            v-slot="{ field }"
            name="quote.en"
            :validateOnInput="true"
            :validateOnBlur="false"
          >
            <textarea
              id="edit-quote-en-from-movie-modal"
              v-bind="field"
              class="resize-none w-full bg-transparent border pl-4 pr-11 py-2 rounded-[4px] italic text-white placeholder:text-grey-main outline-none scrollbar-none"
              placeholder="New quote"
              rows="3"
              :class="errors['quote.en'] ? 'border-red-main' : 'border-grey-main'"
            ></textarea>
          </Field>
          <label
            for="edit-quote-en-from-movie-modal"
            class="absolute right-4 top-4 bg-transparent text-grey-main"
            >Eng</label
          >
          <ErrorMessage class="text-red-main" name="quote.en" />
        </div>

        <div class="relative">
          <Field
            :value="quoteData?.quote.ka"
            v-slot="{ field }"
            name="quote.ka"
            :validateOnInput="true"
            :validateOnBlur="false"
          >
            <textarea
              id="edit-quote-ka-from-movie-modal"
              v-bind="field"
              class="resize-none w-full bg-transparent border pl-4 pr-11 py-2 rounded-[4px] italic text-white placeholder:text-grey-main outline-none scrollbar-none"
              placeholder="ახალი ციტატა"
              rows="3"
              :class="errors['quote.ka'] ? 'border-red-main' : 'border-grey-main'"
            ></textarea>
          </Field>
          <label
            for="edit-quote-ka-from-movie-modal"
            class="absolute right-4 top-4 bg-transparent text-grey-main"
            >ქარ</label
          >
          <ErrorMessage class="text-red-main" name="quote.ka" />
        </div>

        <div>
          <div class="h-80 lg:h-[32rem] w-full relative mb-2">
            <img
              ref="imageRef"
              class="h-full w-full object-cover rounded-llg"
              :src="quoteData?.image"
            />
            <label
              for="edit-quote-from-movie-modal"
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 flex flex-col items-center gap-2 rounded-llg p-4 cursor-pointer hover:brightness-75"
            >
              <CameraIcon />
              <h2>{{ t('show.change_photo') }}</h2>
            </label>
            <Field
              @change="changeImage"
              name="image"
              id="edit-quote-from-movie-modal"
              type="file"
              accept="image/*"
              hidden
            />
          </div>
          <ErrorMessage class="text-red-main" name="image" />
        </div>
        <button
          class="flex justify-center gap-4 bg-red-main w-full p-3 rounded-md lg:enabled:hover:bg-white lg:enabled:hover:text-red-main lg:enabled:hover:duration-300 disabled:cursor-not-allowed"
          :disabled="isSubmitting"
        >
          <LoadingSpinnerMini v-if="isSubmitting" />
          {{ isSubmitting ? t('loading') : t('show.add_quote') }}
        </button>
      </main>
    </form>
  </MainModal>
</template>

<script setup lang="ts">
import XIcon from '@/components/icons/XIcon.vue'
import MainModal from '@/components/dashboard/modals/MainModal.vue'
import { useI18n } from 'vue-i18n'
import { useQuotesStore } from '@/stores/QuotesStore'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/AuthStore'
import type { Quote, QuotesData } from '@/types'
import { useMoviesStore } from '@/stores/MoviesStore'
import { useForm, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { computed } from 'vue'
import CameraIcon from '../icons/CameraIcon.vue'
import { editQuote, deleteQuote, getQuote as getQuoteApi } from '@/services/api/quotes'
import { useRoute } from 'vue-router'
import TrashIcon from '../icons/TrashIcon.vue'

const { t } = useI18n()
const quotesStore = useQuotesStore()
const { userData } = storeToRefs(useAuthStore())
const moviesStore = useMoviesStore()
const { params } = useRoute()
const quoteData = ref<QuotesData | null>(null)
const imageRef = ref<HTMLImageElement | null>(null)

const schema = computed(() =>
  yup.object().shape({
    quote: yup.object().shape({
      en: yup
        .string()
        .trim()
        .required(t('validation.movie_form_validation.quote.required'))
        .matches(/^[A-Za-z0-9\s.,:-]+$/, t('validation.movie_form_validation.regex_en')),
      ka: yup
        .string()
        .trim()
        .required(t('validation.movie_form_validation.quote.required'))
        .matches(/^[\u10A0-\u10FF0-9\s.,:-]+$/, t('validation.movie_form_validation.regex_ka'))
    })
  })
)

const { handleSubmit, errors, setFieldError, setFieldValue, isSubmitting } = useForm<Quote>({
  validationSchema: schema
})

const submit = handleSubmit(async (values) => {
  try {
    if (quoteData.value) await editQuote(values, quoteData.value.id)
    closeModal()
    moviesStore.getMovie(params.movieId.toString())
  } catch (error: any) {
    console.log(error)
    if (error.response?.data?.errors) {
      for (const fieldName in error.response.data.errors) {
        setFieldError(fieldName as keyof Quote, error.response.data.errors[fieldName])
      }
    }
  }
})

function closeModal() {
  quotesStore.closeEditQuoteModal()
}

async function getQuote() {
  const {
    data: { data }
  } = await getQuoteApi(quotesStore.editQuoteModal.id)
  quoteData.value = data
  setFieldValue('quote.en', data.quote.en)
  setFieldValue('quote.ka', data.quote.ka)
}
getQuote()

function changeImage(event: InputEvent) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const reader = new FileReader()
    reader.onload = function (e) {
      if (imageRef.value && e.target) imageRef.value.src = e.target.result as string
    }
    reader.readAsDataURL(target.files[0])
  }
}
</script>
