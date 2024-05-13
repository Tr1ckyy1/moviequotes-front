<template>
  <section class="px-7 lg:px-0 space-y-8">
    <header class="flex justify-between gap-10">
      <h1 class="text-2xl">{{ t('list.title', { number: 25 }) }}</h1>
      <div class="flex min-w-fit gap-3">
        <label
          class="hidden lg:flex items-center gap-4"
          :class="searchFocused && 'border-b border-grey-secondary'"
          for="movies-list-search"
        >
          <SearchIcon width="20" heigh="20" fill="#CED4DA" />
          <input
            class="outline-none bg-transparent w-20 placeholder:text-grey-secondary text-white focus:w-full"
            :placeholder="t('list.search')"
            id="movies-list-search"
            @focus="searchFocused = true"
            @blur="searchFocused = false"
          />
        </label>
        <div
          class="group flex lg:cursor-pointer items-center gap-3 bg-red-main border border-red-main rounded-[4px] py-2 lg:hover:bg-white lg:hover:text-red-main lg:hover:duration-300 px-4 h-fit"
        >
          <div
            class="border h-4 w-4 flex items-center justify-center rounded-sm pb-0.5 lg:group-hover:border-red-main lg:hover:duration-300"
          >
            <span class="text-lg">+</span>
          </div>
          <button>
            {{ t('list.add_movie_button') }}
          </button>
        </div>
      </div>
    </header>
    <main class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 gap-x-6">
      <MovieListItem
        v-for="(movie, index) in moviesList"
        :key="movie.id"
        :movie="movie"
        :class="index === moviesList.length - 1 && 'pb-16 lg:pb-[6rem]'"
      />
    </main>
  </section>
</template>

<script setup lang="ts">
import MovieListItem from '@/components/movies-list/MovieListItem.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const moviesList = ref([
  { id: 1, title: 'random title', year: 2001, totalQuotes: 4 },
  { id: 2, title: 'random title', year: 2001, totalQuotes: 4 },
  { id: 3, title: 'random title', year: 2001, totalQuotes: 4 },
  { id: 4, title: 'random title', year: 2001, totalQuotes: 4 },
  { id: 5, title: 'random title', year: 2001, totalQuotes: 4 },
  { id: 6, title: 'random title', year: 2001, totalQuotes: 4 },
  { id: 7, title: 'random title', year: 2001, totalQuotes: 4 },
  { id: 8, title: 'random title', year: 2001, totalQuotes: 4 },
  { id: 9, title: 'random title', year: 2001, totalQuotes: 4 },
  { id: 11, title: 'random title', year: 2001, totalQuotes: 4 },
  { id: 12, title: 'random title', year: 2001, totalQuotes: 4 },
  { id: 13, title: 'random title', year: 2001, totalQuotes: 4 },
  { id: 14, title: 'random title', year: 2001, totalQuotes: 4 },
  { id: 15, title: 'random title', year: 2001, totalQuotes: 4 },
  { id: 16, title: 'random title', year: 2001, totalQuotes: 4 },
  { id: 17, title: 'random title', year: 2001, totalQuotes: 4 },
  { id: 18, title: 'random title', year: 2001, totalQuotes: 4 },
  { id: 19, title: 'random title', year: 2001, totalQuotes: 4 },
  { id: 20, title: 'random title', year: 2001, totalQuotes: 4 },
  { id: 21, title: 'random title', year: 2001, totalQuotes: 4 },
  { id: 22, title: 'random title', year: 2001, totalQuotes: 4 },
  { id: 23, title: 'random title', year: 2001, totalQuotes: 4 }
])

const searchFocused = ref(false)
const { t } = useI18n()
</script>
