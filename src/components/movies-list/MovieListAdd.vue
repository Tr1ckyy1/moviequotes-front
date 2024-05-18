<template>
  <MainModal @submit="submit" :modalOpen="modalOpen" @close-modal="closeModal">
    <form
      @submit="submit"
      class="bg-[#0D0B14] h-full lg:max-h-[50rem] overflow-y-auto scrollbar-none lg:ml-[calc(25%_+80px)] xl:ml-[25%] lg:rounded-xl lg:w-[55%]"
      enctype="multipart/form-data"
    >
      <header class="flex items-center p-7 border-b border-[#EFEFEF33]">
        <h1 class="capitalize font-semibold text-xl mx-auto">
          {{ t('list.add_movie_button') }}
        </h1>
        <XIcon @click="closeModal" class="lg:cursor-pointer" />
      </header>
      <main class="p-7 space-y-6">
        <section class="flex items-center gap-5">
          <div class="w-10 h-10 lg:h-14 lg:w-14 shrink-0">
            <img
              v-if="userData?.profileImage"
              :src="userData?.profileImage"
              class="object-cover rounded-full h-full w-full"
            />
            <img v-else src="@/assets/avatar.png" class="object-cover h-full w-full" />
          </div>
          <h2>{{ userData?.username }}</h2>
        </section>
        <MovieListInput
          name="name.en"
          placeholder="Movie name"
          id="add-movie-name-en"
          lang="Eng"
          :error="errors['name.en']"
        />
        <MovieListInput
          name="name.ka"
          placeholder="ფილმის სახელი"
          id="add-movie-name-ka"
          lang="ქარ"
          :error="errors['name.ka']"
        />
        <div>
          <div
            @click="dropDownActive = !dropDownActive"
            class="flex relative justify-between items-center border py-2 min-h-12 rounded-md px-4 cursor-pointer"
            :class="categoryError ? 'border-red-main' : 'border-grey-main'"
          >
            <div v-if="categoriesChosen.length > 0" class="flex flex-wrap gap-1">
              <CategoryItem
                @click.stop
                @remove="removeItem"
                v-for="category in categoriesChosen"
                :key="category.id"
                :name="category.name[locale as Language]"
                :id="category.id"
              />
            </div>
            <p v-else class="text-grey-main">
              {{ t('list.choose_category') }}
            </p>
            <div>
              <ArrowDown width="16" height="16" :class="dropDownActive && 'rotate-180'" />
            </div>
            <ul
              @click.stop
              v-if="dropDownActive"
              class="absolute space-y-2 px-4 py-2 border-x border-b border-grey-main bg-[#0D0B14] mt-1 top-full rounded-b-md h-32 z-[100] w-full left-0 overflow-y-scroll scrollbar"
            >
              <li
                v-for="category in moviesStore.categories"
                :key="category.id"
                class="bg-grey-main/10 cursor-pointer lg:hover:brightness-75"
                @click.stop="manageActiveCategories(category)"
              >
                {{ category.name[locale as Language] }}
              </li>
            </ul>
          </div>
          <p v-if="categoryError" class="mt-2 text-red-main">
            {{ t('validation.movie_form_validation.categories') }}
          </p>
        </div>

        <div>
          <Field
            type="number"
            name="year"
            placeholder="წელი/Year"
            class="border mb-2 bg-transparent w-full outline-none py-2.5 px-4 rounded-md placeholder:text-grey-main"
            :validateOnInput="true"
            :validateOnBlur="false"
            :class="errors.year ? 'border-red-main' : 'border-grey-main'"
          />
          <ErrorMessage class="text-red-main" name="year" />
        </div>
        <MovieListInput
          name="director.en"
          placeholder="Director"
          id="add-movie-director-en"
          lang="Eng"
          :error="errors['director.en']"
        />
        <MovieListInput
          name="director.ka"
          placeholder="რეჟისორი"
          id="add-movie-director-ka"
          lang="ქარ"
          :error="errors['director.ka']"
        />
        <div class="relative">
          <Field
            v-slot="{ field }"
            name="description.en"
            :validateOnInput="true"
            :validateOnBlur="false"
          >
            <textarea
              id="add-movie-description-en"
              v-bind="field"
              class="resize-none w-full bg-transparent border pl-4 pr-11 py-2 rounded-[4px] text-white placeholder:text-grey-main outline-none scrollbar-none"
              placeholder="Movie description"
              rows="3"
              :class="errors['description.en'] ? 'border-red-main' : 'border-grey-main'"
            ></textarea>
            <label
              for="add-movie-description-en"
              class="absolute right-4 top-4 bg-transparent text-grey-main"
              >Eng</label
            >
          </Field>
          <ErrorMessage class="text-red-main" name="description.en" />
        </div>
        <div class="relative">
          <Field
            v-slot="{ field }"
            name="description.ka"
            :validateOnInput="true"
            :validateOnBlur="false"
          >
            <textarea
              id="add-movie-description-ka"
              v-bind="field"
              class="resize-none w-full bg-transparent border pl-4 pr-11 py-2 rounded-[4px] text-white placeholder:text-grey-main outline-none scrollbar-none"
              placeholder="ფილმის აღწერა"
              rows="3"
              :class="errors['description.ka'] ? 'border-red-main' : 'border-grey-main'"
            ></textarea>
          </Field>
          <label
            for="add-movie-description-ka"
            class="absolute right-4 top-4 bg-transparent text-grey-main"
            >ქარ</label
          >
          <ErrorMessage class="text-red-main" name="description.ka" />
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
              for="movie-add-file-upload"
              class="ml-auto lg:ml-0 bg-[#9747FF66] rounded-sm p-2.5 text-center lg:cursor-pointer lg:hover:bg-white lg:hover:text-[#9747FF] lg:hover:duration-300"
            >
              {{ t('modal.choose_file') }}
            </label>
            <Field
              @change="updateName"
              name="image"
              id="movie-add-file-upload"
              type="file"
              accept="image/*"
              hidden
            />
          </div>
          <ErrorMessage class="text-red-main" name="image" />
        </div>

        <button
          class="flex justify-center gap-4 items-center bg-red-main w-full p-3 rounded-md lg:enabled:hover:bg-white lg:enabled:hover:text-red-main lg:enabled:hover:duration-300"
          :disabled="isSubmitting"
        >
          <LoadingSpinnerMini v-if="isSubmitting" />

          {{ isSubmitting ? t('loading') : t('list.add_movie_button') }}
        </button>
      </main>
    </form>
  </MainModal>
</template>

<script setup lang="ts">
import XIcon from '../icons/XIcon.vue'
import MainModal from '../dashboard/modals/MainModal.vue'
import MovieListInput from './MovieListInput.vue'
import CategoryItem from './CategoryItem.vue'
import { addMovie } from '@/services/api/movieList'
import { useI18n } from 'vue-i18n'
import { ErrorMessage, Field, useForm } from 'vee-validate'
import CameraIcon from '../icons/CameraIcon.vue'
import ArrowDown from '../icons/ArrowDown.vue'
import { ref } from 'vue'
import { useMoviesStore } from '@/stores/MoviesStore'
import { storeToRefs } from 'pinia'
import type { Category, Language, MovieData } from '@/types'
import { useAuthStore } from '@/stores/AuthStore'
import * as yup from 'yup'
import { computed } from 'vue'

const { userData } = storeToRefs(useAuthStore())

const moviesStore = useMoviesStore()

const { t, locale } = useI18n()

const emit = defineEmits<{
  (e: 'close-modal'): void
}>()

defineProps<{
  modalOpen: boolean
}>()

const dropDownActive = ref(false)
const imageName = ref('')
const MAX_NUM_CHARACTERS = 50
const categoryError = ref(false)

const schema = computed(() =>
  yup.object().shape({
    name: yup.object().shape({
      en: yup
        .string()
        .trim()
        .required(t('validation.movie_form_validation.name.required'))
        .matches(/^[A-Za-z0-9\s.,:-]+$/, t('validation.movie_form_validation.regex_en')),
      ka: yup
        .string()
        .trim()
        .required(t('validation.movie_form_validation.name.required'))
        .matches(/^[\u10A0-\u10FF0-9\s.,:-]+$/, t('validation.movie_form_validation.regex_ka'))
    }),
    director: yup.object().shape({
      en: yup
        .string()
        .trim()
        .required(t('validation.movie_form_validation.director.required'))
        .matches(/^[A-Za-z0-9\s.,:-]+$/, t('validation.movie_form_validation.regex_en')),
      ka: yup
        .string()
        .trim()
        .required(t('validation.movie_form_validation.director.required'))
        .matches(/^[\u10A0-\u10FF0-9\s.,:-]+$/, t('validation.movie_form_validation.regex_ka'))
    }),
    description: yup.object().shape({
      en: yup
        .string()
        .trim()
        .required(t('validation.movie_form_validation.description.required'))
        .matches(/^[A-Za-z0-9\s.,:-]+$/, t('validation.movie_form_validation.regex_en')),
      ka: yup
        .string()
        .trim()
        .required(t('validation.movie_form_validation.description.required'))
        .matches(/^[\u10A0-\u10FF0-9\s.,:-]+$/, t('validation.movie_form_validation.regex_ka'))
    }),
    year: yup
      .number()
      .typeError(t('validation.movie_form_validation.year.number'))
      .required(t('validation.movie_form_validation.year.required'))
      .min(1900, t('validation.movie_form_validation.year.min'))
      .max(new Date().getFullYear(), t('validation.movie_form_validation.year.max')),
    image: yup.mixed().required(t('validation.movie_form_validation.image'))
  })
)

const { handleSubmit, errors, setFieldError, isSubmitting, setFieldValue } = useForm<MovieData>({
  validationSchema: schema
})

const categoriesChosen = ref<Category[]>([])

function closeModal() {
  emit('close-modal')
}

const submit = handleSubmit(async (values) => {
  if (categoriesChosen.value.length === 0) {
    categoryError.value = true
    return
  }
  const categoryIds = categoriesChosen.value.map((category) => category.id)
  try {
    await addMovie({ ...values, categories: categoryIds })
    closeModal()
    moviesStore.getMovies(true)
  } catch (error: any) {
    if (error.response?.data?.errors) {
      if (error.response.data.errors.categories) categoryError.value = true

      for (const fieldName in error.response.data.errors) {
        setFieldError(fieldName as keyof MovieData, error.response.data.errors[fieldName])
      }
    }
  }
})

function manageActiveCategories(payload: Category) {
  if (categoriesChosen.value.length === 0) categoryError.value = false
  const itemExists = categoriesChosen.value.find((item) => item.id === payload.id)
  if (itemExists)
    categoriesChosen.value = categoriesChosen.value.filter((item) => item.id !== payload.id)
  else categoriesChosen.value.push(payload)
}

function removeItem(id: number) {
  categoriesChosen.value = categoriesChosen.value.filter((item) => item.id !== id)
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
</script>
