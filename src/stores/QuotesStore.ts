import type { BroadcastComment, BroadcastLike, QuotesData } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
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

  async function getQuotes(query: Object = {}) {
    try {
      loading.value = true
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

  function updateQuoteLikes(data: BroadcastLike['data']) {
    const quote = computed(() => quotes.value.find((item) => item.id === data.quote_id))
    if (quote.value) {
      if (data.like) {
        quote.value.likes.push(data.like)
      } else {
        quote.value.likes = quote.value.likes.filter((like) => like.id !== data.like_id)
      }
    }
  }

  function updateQuoteComments(data: BroadcastComment['data']) {
    const quote = quotes.value.find((q) => q.id === data.quote_id)
    if (quote) {
      quote.comments.push(data.comment)
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
    loadMore,
    updateQuoteLikes,
    updateQuoteComments
  }
})
