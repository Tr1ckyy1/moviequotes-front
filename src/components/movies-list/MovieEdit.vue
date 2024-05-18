<template>
  <MainModal @submit="submit" :modalOpen="modalOpen" @close-modal="closeModal">
    <form
      @submit="submit"
      class="bg-[#0D0B14] h-full lg:max-h-[50rem] overflow-y-auto scrollbar-none lg:ml-[calc(25%_+80px)] xl:ml-[25%] lg:rounded-xl lg:w-[55%]"
      enctype="multipart/form-data"
    >
      <header class="flex items-center p-7 border-b border-[#EFEFEF33]">
        <h1 class="capitalize font-semibold text-xl mx-auto">
          {{ t('list.edit_movie_button') }}
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
        <div>
          <div class="relative mb-2">
            <label
              for="edit-movie-name-en"
              class="absolute text-grey-main left-4 top-1/2 -translate-y-1/2"
              >Movie name:</label
            >
            <Field
              :value="movie?.name.en"
              id="edit-movie-name-en"
              type="text"
              name="name.en"
              class="border bg-transparent w-full outline-none py-2.5 pl-28 pr-12 rounded-md placeholder:text-grey-main"
              :validateOnInput="true"
              :validateOnBlur="false"
              :class="errors['name.en'] ? 'border-red-main' : 'border-grey-main'"
            />
            <label
              class="absolute top-1/2 -translate-y-1/2 right-4 text-grey-main"
              for="edit-movie-name-en"
              >Eng</label
            >
          </div>
          <ErrorMessage class="text-red-main" name="name.en" />
        </div>

        <div>
          <div class="relative mb-2">
            <label
              for="edit-movie-name-ka"
              class="absolute text-grey-main left-4 top-1/2 -translate-y-1/2"
              >ფილმის სახელი:</label
            >
            <Field
              :value="movie?.name.ka"
              id="edit-movie-name-ka"
              type="text"
              name="name.ka"
              class="border bg-transparent w-full outline-none py-2.5 pl-[9.3rem] pr-12 rounded-md placeholder:text-grey-main"
              :validateOnInput="true"
              :validateOnBlur="false"
              :class="errors['name.ka'] ? 'border-red-main' : 'border-grey-main'"
            />
            <label
              class="absolute top-1/2 -translate-y-1/2 right-4 text-grey-main"
              for="edit-movie-name-ka"
              >ქარ</label
            >
          </div>
          <ErrorMessage class="text-red-main" name="name.ka" />
        </div>

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
                v-for="category in categories"
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
          <div class="relative mb-2">
            <label
              for="edit-movie-year"
              class="absolute text-grey-main top-1/2 left-4 -translate-y-1/2"
              >წელი/Year:</label
            >
            <Field
              :value="movie?.year"
              id="edit-movie-year"
              type="number"
              name="year"
              class="border bg-transparent w-full outline-none py-2.5 pl-[6.5rem] pr-4 rounded-md placeholder:text-grey-main"
              :validateOnInput="true"
              :validateOnBlur="false"
              :class="errors.year ? 'border-red-main' : 'border-grey-main'"
            />
          </div>

          <ErrorMessage class="text-red-main" name="year" />
        </div>

        <div>
          <div class="relative mb-2">
            <label
              for="edit-movie-director-en"
              class="absolute text-grey-main left-4 top-1/2 -translate-y-1/2"
              >Director:</label
            >
            <Field
              :value="movie?.director.en"
              id="edit-movie-director-en"
              type="text"
              name="director.en"
              class="border bg-transparent w-full outline-none py-2.5 pl-[5.3rem] pr-12 rounded-md placeholder:text-grey-main"
              :validateOnInput="true"
              :validateOnBlur="false"
              :class="errors['director.en'] ? 'border-red-main' : 'border-grey-main'"
            />
            <label
              class="absolute top-1/2 -translate-y-1/2 right-4 text-grey-main"
              for="edit-movie-director-en"
              >ქარ</label
            >
          </div>
          <ErrorMessage class="text-red-main" name="director.en" />
        </div>

        <div>
          <div class="relative mb-2">
            <label
              for="edit-movie-director-ka"
              class="absolute text-grey-main left-4 top-1/2 -translate-y-1/2"
              >რეჟისორი:</label
            >
            <Field
              :value="movie?.director.ka"
              id="edit-movie-director-ka"
              type="text"
              name="director.ka"
              class="border bg-transparent w-full outline-none py-2.5 pl-[6.5rem] pr-12 rounded-md placeholder:text-grey-main"
              :validateOnInput="true"
              :validateOnBlur="false"
              :class="errors['director.ka'] ? 'border-red-main' : 'border-grey-main'"
            />
            <label
              class="absolute top-1/2 -translate-y-1/2 right-4 text-grey-main"
              for="edit-movie-director-ka"
              >ქარ</label
            >
          </div>
          <ErrorMessage class="text-red-main" name="director.ka" />
        </div>

        <div class="relative">
          <label
            class="absolute pt-2 left-0 pl-4 rounded-t border-t border-l border-r text-grey-main bg-[#0D0B14] w-full top-0"
            :class="errors['description.en'] ? 'border-red-main' : 'border-grey-main'"
            for="edit-movie-description-en"
            >Description:</label
          >
          <Field
            :value="movie?.description.en"
            v-slot="{ field }"
            name="description.en"
            :validateOnInput="true"
            :validateOnBlur="false"
          >
            <textarea
              id="edit-movie-description-en"
              v-bind="field"
              class="resize-none w-full bg-transparent border pl-4 pr-11 py-8 rounded-[4px] text-white placeholder:text-grey-main outline-none scrollbar-none"
              rows="1"
              :class="errors['description.en'] ? 'border-red-main' : 'border-grey-main'"
            ></textarea>
            <label for="edit-movie-description-en" class="absolute right-4 top-4 bg-transparent"
              >Eng</label
            >
          </Field>
          <ErrorMessage class="text-red-main" name="description.en" />
        </div>
        <div class="relative">
          <label
            class="absolute pt-2 left-0 pl-4 rounded-t border-t border-l border-r text-grey-main bg-[#0D0B14] w-full top-0"
            :class="errors['description.ka'] ? 'border-red-main' : 'border-grey-main'"
            for="edit-movie-description-ka"
            >ფილმის აღწერა:</label
          >
          <Field
            :value="movie?.description.ka"
            v-slot="{ field }"
            name="description.ka"
            :validateOnInput="true"
            :validateOnBlur="false"
          >
            <textarea
              id="edit-movie-description-ka"
              v-bind="field"
              class="resize-none w-full bg-transparent border pl-4 pr-11 py-8 rounded-[4px] text-white placeholder:text-grey-main outline-none scrollbar-none"
              rows="1"
              :class="errors['description.ka'] ? 'border-red-main' : 'border-grey-main'"
            ></textarea>
          </Field>
          <label for="edit-movie-description-ka" class="absolute right-4 top-4 bg-transparent"
            >ქარ</label
          >
          <ErrorMessage class="text-red-main" name="description.ka" />
        </div>
        <div>
          <div
            class="border flex items-center p-4 gap-4 mb-2"
            @dragover.prevent
            @drop.prevent="onDrop"
            :class="errors.image ? 'border-red-main' : 'border-grey-main'"
          >
            <CameraIcon class="shrink-0 hidden" />
            <img
              class="w-1/2 h-36 object-cover border border-dashed border-main"
              :src="movie?.image"
              ref="imageRef"
            />
            <div class="flex flex-col gap-6 lg:items-center lg:justify-center w-1/2">
              <p class="font-bold text-xs lg:text-base text-main uppercase">
                {{ t('list.replace_photo') }}
              </p>
              <p class="hidden lg:block text-xl">{{ t('modal.upload_image_desktop') }}</p>
              <label
                for="movie-edit-file-upload"
                class="bg-[#9747FF66] w-fit rounded-sm p-2.5 text-sm lg:text-lg lg:cursor-pointer lg:hover:bg-white lg:hover:text-[#9747FF] lg:hover:duration-300"
              >
                {{ t('modal.choose_file') }}
              </label>
            </div>
            <Field
              @change="changeImage"
              name="image"
              id="movie-edit-file-upload"
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

          {{ isSubmitting ? t('loading') : t('list.edit_movie_button') }}
        </button>
      </main>
    </form>
  </MainModal>
</template>

<script setup lang="ts">
import XIcon from '../icons/XIcon.vue'
import MainModal from '../dashboard/modals/MainModal.vue'
import CategoryItem from './CategoryItem.vue'
import { editMovie } from '@/services/api/movieList'
import { useI18n } from 'vue-i18n'
import { ErrorMessage, Field, useForm } from 'vee-validate'
import CameraIcon from '../icons/CameraIcon.vue'
import ArrowDown from '../icons/ArrowDown.vue'
import { ref } from 'vue'
import { useMoviesStore } from '@/stores/MoviesStore'
import { storeToRefs } from 'pinia'
import type { Category, Language, MovieData, Movies } from '@/types'
import { useAuthStore } from '@/stores/AuthStore'
import * as yup from 'yup'
import { computed } from 'vue'
import { onMounted } from 'vue'

const { userData } = storeToRefs(useAuthStore())

const { categories } = storeToRefs(useMoviesStore())

const { t, locale } = useI18n()

const emit = defineEmits<{
  (e: 'close-modal'): void
  (e: 'refetch'): void
}>()

const props = defineProps<{
  modalOpen: boolean
  movie: Movies | null
}>()

const dropDownActive = ref(false)
const categoryError = ref(false)
const imageRef = ref<HTMLImageElement | null>(null)

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
    const movieId = props.movie?.id ?? null
    await editMovie({ ...values, categories: categoryIds }, movieId)
    closeModal()
    emit('refetch')
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

function onDrop(event: DragEvent) {
  const files = event.dataTransfer?.files
  if (files && files[0]) {
    const reader = new FileReader()
    reader.onload = function (e) {
      if (imageRef.value && e.target) imageRef.value.src = e.target.result as string
    }
    reader.readAsDataURL(files[0])
    setFieldValue('image', files[0])
  }
}

onMounted(() => {
  if (props.movie && props.movie.categories) {
    categoriesChosen.value = props.movie.categories.slice()
  }
})
</script>
