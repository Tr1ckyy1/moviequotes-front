import type { Category, Movies } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getCategories as getCategoriesApi,
  getMovies as getMoviesApi
} from '@/services/api/movieList'

export const useMoviesStore = defineStore('MoviesStore', () => {
  const categories = ref<Category[]>([])
  const movies = ref<Movies[]>([])
  const pageLoading = ref(false)
  const moviesPageLoading = ref(false)
  const viewQuoteModal = ref<{ visible: boolean; id: number | null }>({
    visible: false,
    id: null
  })

  function openViewQuoteModal(id: number) {
    viewQuoteModal.value = {
      visible: true,
      id
    }
  }

  function closeViewQuoteModal() {
    viewQuoteModal.value = {
      visible: false,
      id: null
    }
  }

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
    viewQuoteModal,
    openViewQuoteModal,
    closeViewQuoteModal
  }
})
