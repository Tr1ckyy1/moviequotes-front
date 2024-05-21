import type { QuotesData } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getQuotes as getQuotesApi } from '@/services/api/quotes'

export const useQuotesStore = defineStore('QuotesStore', () => {
  const quotes = ref<QuotesData[]>([])
  const loading = ref(false)
  const page = ref(1)
  const totalPages = ref(0)

  type QuoteModal = {
    visible: boolean
    id: number | null
  }
  const viewQuoteModal = ref<QuoteModal>({
    visible: false,
    id: null
  })

  const editQuoteModal = ref<QuoteModal>({
    visible: false,
    id: null
  })

  const addQuoteModal = ref(false)

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
  function openEditQuoteModal(id: number) {
    editQuoteModal.value = {
      visible: true,
      id
    }
  }

  function closeEditQuoteModal() {
    editQuoteModal.value = {
      visible: false,
      id: null
    }
  }

  function openAddQuoteModal() {
    addQuoteModal.value = true
  }

  function closeAddQuoteModal() {
    addQuoteModal.value = false
  }

  async function getQuotes(showSpinner = true, query: Object = {}) {
    try {
      if (showSpinner) loading.value = true
      const { data } = await getQuotesApi({
        page: page.value,
        filter: {
          ...query
        }
      })

      quotes.value = data.data
      totalPages.value = data.meta.last_page
    } catch (err) {
      //
    } finally {
      loading.value = false
    }
  }

  async function loadMore(query: Object = {}) {
    if (page.value < totalPages.value) {
      page.value++
      const { data } = await getQuotesApi({
        page: page.value,
        filter: {
          ...query
        }
      })
      if (page.value <= data.meta.last_page) {
        quotes.value.push(...data.data)
      }
    }
  }
  return {
    quotes,
    loading,
    getQuotes,
    viewQuoteModal,
    openViewQuoteModal,
    closeViewQuoteModal,
    addQuoteModal,
    openAddQuoteModal,
    closeAddQuoteModal,
    editQuoteModal,
    openEditQuoteModal,
    closeEditQuoteModal,
    loadMore
  }
})
