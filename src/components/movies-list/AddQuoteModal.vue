<template>
  <MainModal :modalOpen="quotesStore.addQuoteModal" @close-modal="closeModal">
    <form
      @submit="submit"
      class="bg-[#0D0B14] h-full lg:max-h-[50rem] overflow-y-auto scrollbar-none lg:ml-[calc(25%_+80px)] xl:ml-[calc(25%_+16px)] lg:rounded-xl lg:w-[55%]"
    >
      <header class="flex items-center p-7 border-b border-[#EFEFEF33]">
        <h1 class="capitalize font-semibold text-xl mx-auto">
          {{ t('show.add_quote') }}
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
        <section class="bg-black p-2 lg:p-0 lg:bg-transparent rounded flex gap-4 items-center">
          <img
            :src="moviesStore.movie?.image"
            class="h-20 lg:h-40 w-1/3 object-cover rounded-llg shrink-0 lg:rounded-xl"
          />
          <div class="space-y-2">
            <h2 class="text-main">
              {{ moviesStore.movie?.name[locale as Language] }}
              <span>({{ moviesStore.movie?.year }})</span>
            </h2>
            <p class="text-grey-secondary text-lg font-bold">
              {{ t('show.director') }}:
              <span class="text-white font-medium text-base">{{
                moviesStore.movie?.director[locale as Language]
              }}</span>
            </p>
            <ul class="flex flex-wrap gap-1">
              <CategoryItem
                v-for="category in moviesStore.movie?.categories"
                :key="category.id"
                :name="category.name[locale as Language]"
              />
            </ul>
          </div>
        </section>
        <div class="flex flex-col lg:flex-col-reverse gap-6">
          <div>
            <div
              @dragover.prevent
              @drop.prevent="onDrop"
              class="border flex items-center p-4 gap-4 mb-2"
              :class="errors.image ? 'border-red-main' : 'border-grey-main'"
            >
              <CameraIcon class="shrink-0" />
              <p class="lg:hidden">{{ imageName || t('modal.upload_image') }}</p>
              <p class="hidden lg:block">{{ imageName || t('modal.upload_image_desktop') }}</p>
              <label
                for="new-quote-image-from-movie-modal"
                class="ml-auto lg:ml-0 bg-[#9747FF66] rounded-sm p-2.5 text-center lg:cursor-pointer lg:hover:bg-white lg:hover:text-[#9747FF] lg:hover:duration-300"
              >
                {{ t('modal.choose_file') }}
              </label>
              <Field
                @change="updateName"
                name="image"
                id="new-quote-image-from-movie-modal"
                type="file"
                accept="image/*"
                hidden
              />
            </div>
            <ErrorMessage class="text-red-main" name="image" />
          </div>
          <div class="space-y-6">
            <div class="relative">
              <Field
                v-slot="{ field }"
                name="quote.en"
                :validateOnInput="true"
                :validateOnBlur="false"
              >
                <textarea
                  id="new-quote-en-from-movie-modal"
                  v-bind="field"
                  class="resize-none w-full bg-transparent border pl-4 pr-11 py-2 rounded-[4px] italic text-white placeholder:text-grey-main outline-none scrollbar-none"
                  placeholder="New quote"
                  rows="3"
                  :class="errors['quote.en'] ? 'border-red-main' : 'border-grey-main'"
                ></textarea>
              </Field>
              <label
                for="new-quote-en-from-movie-modal"
                class="absolute right-4 top-4 bg-transparent text-grey-main"
                >Eng</label
              >
              <ErrorMessage class="text-red-main" name="quote.en" />
            </div>

            <div class="relative">
              <Field
                v-slot="{ field }"
                name="quote.ka"
                :validateOnInput="true"
                :validateOnBlur="false"
              >
                <textarea
                  id="new-quote-ka-from-movie-modal"
                  v-bind="field"
                  class="resize-none w-full bg-transparent border pl-4 pr-11 py-2 rounded-[4px] italic text-white placeholder:text-grey-main outline-none scrollbar-none"
                  placeholder="ახალი ციტატა"
                  rows="3"
                  :class="errors['quote.ka'] ? 'border-red-main' : 'border-grey-main'"
                ></textarea>
              </Field>
              <label
                for="new-quote-ka-from-movie-modal"
                class="absolute right-4 top-4 bg-transparent text-grey-main"
                >ქარ</label
              >
              <ErrorMessage class="text-red-main" name="quote.ka" />
            </div>
          </div>
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
import type { Language, Quote } from '@/types'
import { useMoviesStore } from '@/stores/MoviesStore'
import CategoryItem from './CategoryItem.vue'
import { useForm, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { computed } from 'vue'
import CameraIcon from '../icons/CameraIcon.vue'
import { addQuote } from '@/services/api/quotes'
import { useRoute } from 'vue-router'
import { MAX_FILE_SIZE } from '@/helpers/fileSize'
import { watch } from 'vue'

const { t, locale } = useI18n()
const quotesStore = useQuotesStore()
const { userData } = storeToRefs(useAuthStore())
const moviesStore = useMoviesStore()
const MAX_NUM_CHARACTERS = 50
const imageName = ref('')
const { params } = useRoute()

const schema = computed(() =>
  yup.object().shape({
    quote: yup.object().shape({
      en: yup
        .string()
        .trim()
        .required(t('validation.movie_form_validation.quote.required'))
        .matches(/^[A-Za-z0-9\s.,:;'"?!`()-]+$/, t('validation.movie_form_validation.regex_en')),
      ka: yup
        .string()
        .trim()
        .required(t('validation.movie_form_validation.quote.required'))
        .matches(
          /^[\u10A0-\u10FF0-9\s.,:;'"?!`()-]+$/,
          t('validation.movie_form_validation.regex_ka')
        )
    }),
    image: yup
      .mixed()
      .required(t('validation.movie_form_validation.image'))
      .test('fileSize', t('size_too_big'), (value) => {
        if (!value) return true
        return (value as File).size <= MAX_FILE_SIZE
      })
  })
)

const { handleSubmit, errors, setFieldError, setFieldValue, isSubmitting } = useForm<Quote>({
  validationSchema: schema
})

const submit = handleSubmit(async (values) => {
  try {
    await addQuote({ ...values, movie: Number(params.movieId) })
    closeModal()
    moviesStore.getMovie(params.movieId.toString())
  } catch (error: any) {
    if (error.response?.data?.errors) {
      for (const fieldName in error.response.data.errors) {
        setFieldError(fieldName as keyof Quote, error.response.data.errors[fieldName])
      }
    }
  }
})

function closeModal() {
  quotesStore.closeAddQuoteModal()
}

function updateName(e: InputEvent) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const splittedName = target.files[0].name.split('.')
    if (splittedName[0].length > MAX_NUM_CHARACTERS)
      imageName.value = splittedName[0].slice(0, MAX_NUM_CHARACTERS) + '...' + splittedName[1]
    else imageName.value = target.files[0].name
  }
}

function onDrop(event: DragEvent) {
  const files = event.dataTransfer?.files
  if (files && files[0]) {
    const splittedName = files[0].name.split('.')
    if (splittedName[0].length > MAX_NUM_CHARACTERS)
      imageName.value = splittedName[0].slice(0, MAX_NUM_CHARACTERS) + '...' + splittedName[1]
    else imageName.value = files[0].name
    setFieldValue('image', files[0])
  }
}

watch(errors, (val) => {
  if (val.image && val.image === t('size_too_big')) console.error(val)
})
</script>
