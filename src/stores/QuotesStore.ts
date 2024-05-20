import type { QuotesData } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getQuotes as getQuotesApi } from '@/services/api/quotes'

export const useQuotesStore = defineStore('QuotesStore', () => {
  const quotes = ref<QuotesData[]>([])
  const loading = ref(false)
  async function getQuotes(showSpinner = true) {
    try {
      if (showSpinner) loading.value = true
      const {
        data: { data }
      } = await getQuotesApi()
      quotes.value = data
    } catch (err) {
      //
    } finally {
      loading.value = false
    }
  }
  return {
    quotes,
    loading,
    getQuotes
  }
})
