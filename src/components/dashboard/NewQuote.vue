<template>
  <MainModal :modalOpen="modalOpen" @close-modal="closeModal">
    <form
      @submit="submit"
      class="bg-[#0D0B14] h-full lg:max-h-[50rem] overflow-y-auto scrollbar-none lg:ml-[calc(25%_+80px)] xl:ml-[calc(25%_+16px)] lg:rounded-xl lg:w-[55%]"
    >
      <header class="flex items-center p-7 border-b border-[#EFEFEF33]">
        <h1 class="capitalize font-semibold text-xl mx-auto">
          {{ t('dashboard.new_quote') }}
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
          <h2 class="break-all">
            {{ userData?.username }}
          </h2>
        </section>

        <div class="relative">
          <Field v-slot="{ field }" name="quote.en" :validateOnInput="true" :validateOnBlur="false">
            <textarea
              id="new-quote-en"
              v-bind="field"
              class="resize-none w-full bg-transparent border pl-4 pr-11 py-2 rounded-[4px] italic text-white placeholder:text-grey-main outline-none scrollbar-none"
              placeholder="New quote"
              rows="3"
              :class="errors['quote.en'] ? 'border-red-main' : 'border-grey-main'"
            ></textarea>
          </Field>
          <label for="new-quote-en" class="absolute right-4 top-4 bg-transparent text-grey-main"
            >Eng</label
          >
          <ErrorMessage class="text-red-main" name="quote.en" />
        </div>

        <div class="relative">
          <Field v-slot="{ field }" name="quote.ka" :validateOnInput="true" :validateOnBlur="false">
            <textarea
              id="new-quote-ka"
              v-bind="field"
              class="resize-none w-full bg-transparent border pl-4 pr-11 py-2 rounded-[4px] italic text-white placeholder:text-grey-main outline-none scrollbar-none"
              placeholder="ახალი ციტატა"
              rows="3"
              :class="errors['quote.ka'] ? 'border-red-main' : 'border-grey-main'"
            ></textarea>
          </Field>
          <label for="new-quote-ka" class="absolute right-4 top-4 bg-transparent text-grey-main"
            >ქარ</label
          >
          <ErrorMessage class="text-red-main" name="quote.ka" />
        </div>
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
              for="new-quote-image"
              class="ml-auto lg:ml-0 bg-[#9747FF66] rounded-sm p-2.5 text-center lg:cursor-pointer lg:hover:bg-white lg:hover:text-[#9747FF] lg:hover:duration-300"
            >
              {{ t('modal.choose_file') }}
            </label>
            <Field
              @change="updateName"
              name="image"
              id="new-quote-image"
              type="file"
              accept="image/*"
              hidden
            />
          </div>
          <ErrorMessage class="text-red-main" name="image" />
        </div>
        <div>
          <div
            @click="dropDownActive = !dropDownActive"
            class="flex items-center px-4 h-24 gap-4 bg-black cursor-pointer relative ring-1"
            :class="movieError ? 'ring-red-main' : 'ring-black'"
          >
            <div class="flex items-center gap-4" v-if="!movieChosen">
              <MovieListIcon />
              <p>{{ t('modal.choose_movie') }}</p>
            </div>
            <div v-else>
              <h2>{{ movieChosen.name[locale as Language] }}</h2>
            </div>
            <ArrowDown
              width="16"
              height="16"
              class="ml-auto"
              :class="dropDownActive && 'rotate-180'"
            />
            <ul
              @click.stop
              v-if="dropDownActive && moviesStore.movies.length > 0"
              class="absolute top-full left-0 w-full space-y-4 py-2 border-x mt-1 border-b bg-[#0D0B14] border-grey-secondary/20 rounded-b-md min-h-14 max-h-24 overflow-y-scroll scrollbar"
            >
              <li
                @click="addChosenMovie(movie)"
                v-for="movie in moviesStore.movies"
                :key="movie.id"
                class="space-y-4 bg-grey-main/10 cursor-pointer lg:hover:brightness-75 px-4 py-1"
              >
                <h2>{{ movie.name[locale as Language] }}</h2>
              </li>
            </ul>
            <div
              @click.stop
              v-if="dropDownActive && moviesStore.movies.length === 0"
              class="absolute px-4 py-5 top-full left-0 w-full space-y-4 text-lg border-x border-b bg-[#0D0B14] border-grey-secondary/20 rounded-b-md overflow-y-scroll scrollbar"
            >
              <p class="text-red-main">
                {{ t('list.no_movies_message') }}
              </p>
              <RouterLink
                class="text-main lg:hover:underline lg:duration-300 block w-fit"
                :to="{ name: 'movies-list' }"
                >{{ t('list.go_to_movies') }}</RouterLink
              >
            </div>
          </div>
          <p v-if="movieError" class="mt-2 text-red-main">
            {{ t('validation.movie_form_validation.quote.movie') }}
          </p>
        </div>

        <button
          class="flex justify-center gap-4 bg-red-main w-full p-3 rounded-md lg:enabled:hover:bg-white lg:enabled:hover:text-red-main lg:enabled:hover:duration-300 disabled:cursor-not-allowed"
          :disabled="isSubmitting"
        >
          <LoadingSpinnerMini v-if="isSubmitting" />
          {{ isSubmitting ? t('loading') : t('modal.post') }}
        </button>
      </main>
    </form>
  </MainModal>
</template>

<script setup lang="ts">
import CameraIcon from '@/components/icons/CameraIcon.vue'
import MovieListIcon from '@/components/icons/MovieListIcon.vue'
import ArrowDown from '@/components/icons/ArrowDown.vue'
import XIcon from '@/components/icons/XIcon.vue'
import MainModal from '@/components/dashboard/modals/MainModal.vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/AuthStore'
import { useForm, Field, ErrorMessage } from 'vee-validate'
import { ref, watch } from 'vue'
import * as yup from 'yup'
import { computed } from 'vue'
import { useMoviesStore } from '@/stores/MoviesStore'
import { addQuote } from '@/services/api/quotes'
import type { Language, Movies, Quote } from '@/types'
import { useQuotesStore } from '@/stores/QuotesStore'
import { useRoute } from 'vue-router'
import { MAX_FILE_SIZE } from '@/helpers/fileSize'

const emit = defineEmits<{
  (e: 'close-modal'): void
}>()

defineProps<{
  modalOpen: boolean
}>()
const { t, locale } = useI18n()

const imageName = ref('')
const MAX_NUM_CHARACTERS = 50
const dropDownActive = ref(false)
const { userData } = storeToRefs(useAuthStore())
const moviesStore = useMoviesStore()
const { getQuotes } = useQuotesStore()
const movieChosen = ref<Movies | null>(null)
const movieError = ref(false)
const { query } = useRoute()

moviesStore.getMovies(true)

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
  if (!movieChosen.value) {
    movieError.value = true
    return
  }

  try {
    const movieId = movieChosen.value?.id ?? null
    await addQuote({ ...values, movie: movieId })
    closeModal()
    getQuotes(query)
  } catch (error: any) {
    if (error.response?.data?.errors) {
      if (error.response.data.errors.movie) movieError.value = true

      for (const fieldName in error.response.data.errors) {
        setFieldError(fieldName as keyof Quote, error.response.data.errors[fieldName])
      }
    }
  }
})

function closeModal() {
  emit('close-modal')
}

function addChosenMovie(payload: Movies) {
  if (movieChosen.value?.id !== payload.id) {
    movieChosen.value = payload
    movieError.value = false
  } else movieChosen.value = null
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
