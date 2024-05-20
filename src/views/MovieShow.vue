<template>
  <LoadingPageMini v-if="loading" />
  <section v-else-if="!loading && movie">
    <ViewQuoteModal v-if="viewQuoteModal.visible" />
    <MovieEdit
      v-if="editMovieModal"
      :modalOpen="editMovieModal"
      @close-modal="closeEditMovie"
      @refetch="getMovie"
      :movie="movie"
    />
    <div class="px-7 lg:px-0 space-y-6">
      <h1 class="hidden lg:block text-2xl font-medium">{{ t('show.movie_description') }}</h1>
      <header
        class="space-y-6 border-b border-[#54535A] lg:border-0 pb-10 lg:flex lg:space-y-0 lg:gap-6"
      >
        <img
          :src="movie.image"
          class="h-80 lg:min-h-[27.5rem] lg:max-h-full w-full flex-grow lg:w-[55%] object-cover rounded-xl shrink-0"
        />
        <div class="space-y-6 lg:w-[45%]">
          <div class="space-y-6 lg:space-y-0 lg:flex lg:justify-between">
            <h1 class="text-main text-2xl font-medium">
              {{ movie.name[locale as Language] }} <span>({{ movie.year }})</span>
            </h1>
            <div class="bg-dark-third w-36 h-10 rounded-llg flex items-center justify-center gap-6">
              <EditIcon @click="openEditMovie" class="lg:hover:brightness-75 cursor-pointer" />
              <span class="bg-grey-main w-[1px] h-1/3"></span>
              <TrashIcon @click="deleteMovie" class="lg:hover:brightness-75 cursor-pointer" />
            </div>
          </div>
          <div class="flex flex-wrap gap-1">
            <CategoryItem
              v-for="category in movie.categories"
              :key="category.id"
              :name="category.name[locale as Language]"
            />
          </div>
          <p class="text-lg text-grey-secondary font-bold">
            {{ t('show.director') }}:
            <span class="text-white">
              {{ movie.director[locale as Language] }}
            </span>
          </p>
          <p class="text-grey-secondary text-lg">{{ movie.description[locale as Language] }}</p>
          <div
            class="lg:hidden w-fit group flex lg:cursor-pointer items-center gap-3 bg-red-main border border-red-main rounded-[4px] py-2 px-4"
          >
            <div
              class="border h-4 w-4 flex items-center justify-center rounded-sm lg:group-hover:border-red-main lg:hover:duration-300"
            >
              <span class="text-lg">+</span>
            </div>
            <button>
              {{ t('show.add_quote') }}
            </button>
          </div>
        </div>
      </header>
      <div class="lg:flex lg:items-center lg:gap-4">
        <h1 class="text-2xl lg:border-r lg:border-grey-main lg:pr-4">
          {{
            t('show.total_quotes', {
              number: isQuotesArray(movie.quotes) ? movie.quotes.length : movie.quotes
            })
          }}
        </h1>
        <div
          class="hidden w-fit group lg:flex lg:cursor-pointer items-center gap-3 bg-red-main border border-red-main rounded-[4px] py-2 hover:bg-white hover:text-red-main hover:duration-300 px-4"
        >
          <div
            class="border h-4 w-4 flex items-center justify-center rounded-sm lg:group-hover:border-red-main lg:hover:duration-300"
          >
            <span class="text-lg">+</span>
          </div>
          <button>
            {{ t('show.add_quote') }}
          </button>
        </div>
      </div>
    </div>
    <ul v-if="isQuotesArray(movie.quotes)" class="mt-6 space-y-8 pb-16 lg:w-[55%] lg:pb-[6.5rem]">
      <QuoteItem v-for="quote in movie.quotes" :key="quote.id" :quote="quote" />
    </ul>
  </section>
</template>

<script setup lang="ts">
import { getMovie as getMovieApi, deleteMovie as deleteMovieApi } from '@/services/api/movieList'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LoadingPageMini from '@/ui/LoadingPageMini.vue'
import { useI18n } from 'vue-i18n'
import type { Movies, QuotesData } from '@/types'
import type { Language } from '@/types'
import CategoryItem from '@/components/movies-list/CategoryItem.vue'
import QuoteItem from '@/components/movies-list/QuoteItem.vue'
import EditIcon from '@/components/icons/EditIcon.vue'
import TrashIcon from '@/components/icons/TrashIcon.vue'
import MovieEdit from '@/components/movies-list/MovieEdit.vue'
import { useMoviesStore } from '@/stores/MoviesStore'
import ViewQuoteModal from '@/components/movies-list/ViewQuoteModal.vue'

const { t, locale } = useI18n()

const { params } = useRoute()
const loading = ref(false)
const editMovieModal = ref(false)
const router = useRouter()
const movie = ref<Movies | null>(null)
const { getMovies, viewQuoteModal } = useMoviesStore()

function isQuotesArray(quotes: number | QuotesData[]): quotes is QuotesData[] {
  return Array.isArray(quotes)
}

function openEditMovie() {
  editMovieModal.value = true
}

function closeEditMovie() {
  editMovieModal.value = false
}

async function getMovie() {
  try {
    loading.value = true
    const {
      data: { data }
    } = await getMovieApi(params.movieId.toString())
    movie.value = data
  } catch (err: any) {
    if (err.response.status === 403 || err.response.status === 404)
      router.replace({ name: 'movies-list' })
  } finally {
    loading.value = false
  }
}

async function deleteMovie() {
  const movieId = movie.value?.id ?? null
  try {
    loading.value = true
    await deleteMovieApi(movieId)
    router.replace({ name: 'movies-list' })
    getMovies(true)
  } catch (err) {
    //
  } finally {
    loading.value = false
  }
}
getMovie()
</script>
