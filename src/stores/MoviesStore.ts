import type { Category, Movies } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getCategories as getCategoriesApi,
  getMovies as getMoviesApi,
  getMovie as getMovieApi
} from '@/services/api/movieList'
import { useRouter } from 'vue-router'

export const useMoviesStore = defineStore('MoviesStore', () => {
  const categories = ref<Category[]>([])
  const movies = ref<Movies[]>([])
  const pageLoading = ref(false)
  const moviesPageLoading = ref(false)
  const movie = ref<Movies | null>(null)
  const movieLoading = ref(false)

  const router = useRouter()

  async function getCategories() {
    try {
      pageLoading.value = true

      const { data } = await getCategoriesApi()
      categories.value = data
    } catch (err) {
      //
    } finally {
      pageLoading.value = false
    }
  }

  async function getMovie(movieId: string, showSpinner = true) {
    try {
      if (showSpinner) movieLoading.value = true
      const {
        data: { data }
      } = await getMovieApi(movieId.toString())
      movie.value = data
    } catch (err: any) {
      if (err.response.status === 403 || err.response.status === 404)
        router.replace({ name: 'movies-list' })
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
