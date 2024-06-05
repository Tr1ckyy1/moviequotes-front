<template>
  <LoadingPageMini v-if="moviesStore.moviesPageLoading" />
  <section
    v-else-if="!moviesStore.moviesPageLoading && !moviesStore.pageLoading"
    class="px-7 lg:px-0"
  >
    <MovieListAdd v-if="addMoviesModal" :modalOpen="addMoviesModal" @close-modal="closeAddMovies" />

    <header class="flex justify-between gap-10">
      <h1 class="text-2xl">
        {{ t('list.title') }}
        <span class="text-base lg:text-2xl"
          >({{ t('list.total', { number: moviesStore.movies.length }) }})</span
        >
      </h1>
      <div class="flex gap-3">
        <label
          class="hidden lg:flex items-center gap-4"
          :class="searchFocused && 'border-b border-grey-secondary'"
          for="movies-list-search"
        >
          <SearchIcon width="20" heigh="20" fill="#CED4DA" />
          <input
            class="outline-none bg-transparent w-20 placeholder:text-grey-secondary text-white focus:w-full text-xl"
            :placeholder="t('list.search')"
            id="movies-list-search"
            @focus="searchFocused = true"
            @blur="searchFocused = false"
            v-model="search"
          />
        </label>
        <div
          @click="openAddMovies"
          class="group flex lg:cursor-pointer items-center gap-3 bg-red-main border border-red-main rounded-[4px] py-2 lg:hover:bg-white lg:hover:text-red-main lg:hover:duration-300 px-4 h-fit lg:text-xl"
        >
          <div
            class="border h-4 w-4 flex items-center justify-center rounded-sm lg:group-hover:border-red-main lg:hover:duration-300 shrink-0"
          >
            <span class="text-lg">+</span>
          </div>
          <button>
            {{ t('list.add_movie_button') }}
          </button>
        </div>
      </div>
    </header>
    <main class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 gap-x-6 mt-8">
      <MovieListItem
        v-for="(movie, index) in searchedData"
        :key="movie.id"
        :title="movie.name[locale as Language]"
        :id="movie.id"
        :year="movie.year"
        :quotes="movie.quotes"
        :image="movie.image"
        :class="index === moviesStore.movies.length - 1 && 'pb-[6.5rem]'"
      />
    </main>
  </section>
</template>

<script setup lang="ts">
import MovieListItem from '@/components/movies-list/MovieListItem.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import MovieListAdd from '@/components/movies-list/MovieListAdd.vue'
import type { Language } from '@/types'
import { computed } from 'vue'
import LoadingPageMini from '@/ui/LoadingPageMini.vue'
import { useMoviesStore } from '@/stores/MoviesStore'

const { t, locale } = useI18n()
const searchFocused = ref(false)
const addMoviesModal = ref(false)
const search = ref('')
const moviesStore = useMoviesStore()

const searchedData = computed(() => {
  if (search.value)
    return moviesStore.movies.filter((item) =>
      item.name[locale.value as Language].toLowerCase().includes(search.value.toLowerCase())
    )
  return moviesStore.movies
})

moviesStore.getMovies(true)
function openAddMovies() {
  addMoviesModal.value = true
}

function closeAddMovies() {
  addMoviesModal.value = false
}
</script>
