import type { Category, Movies } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getCategories as getCategoriesApi,
  getMovies as getMoviesApi,
  getMovie as getMovieApi
} from '@/services/api/movieList'

export const useMoviesStore = defineStore('MoviesStore', () => {
  const categories = ref<Category[]>([])
  const movies = ref<Movies[]>([])
  const pageLoading = ref(false)
  const moviesPageLoading = ref(false)
  const movie = ref<Movies | null>(null)
  const movieLoading = ref(false)

  async function getCategories() {
    const { data } = await getCategoriesApi()
    categories.value = data
  }

  async function getMovie(movieId: string, showSpinner = true) {
    try {
      if (showSpinner) movieLoading.value = true
      const {
        data: { data }
      } = await getMovieApi(movieId.toString())
      movie.value = data
    } catch (err) {
      //
    } finally {
      movieLoading.value = false
    }
  }

  async function getMovies(moviesPageFetch = false) {
    try {
      moviesPageFetch ? (moviesPageLoading.value = true) : (pageLoading.value = true)
      const {
        data: { data }
      } = await getMoviesApi()
      movies.value = data
    } catch (err) {
      //
    } finally {
      moviesPageFetch ? (moviesPageLoading.value = false) : (pageLoading.value = false)
    }
  }

  return {
    categories,
    getCategories,
    movies,
    getMovies,
    pageLoading,
    moviesPageLoading,
    movie,
    getMovie,
    movieLoading
  }
})
