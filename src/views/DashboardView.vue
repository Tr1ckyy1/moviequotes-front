<template>
  <section class="lg:space-y-4 relative" ref="container">
    <div class="flex gap-7">
      <div
        @click="openQuotesModal"
        class="lg:bg-dark-third p-7 pt-0 lg:py-4 lg:rounded-llg flex gap-4 items-center lg:cursor-pointer"
        :class="searchFocused ? 'w-fit' : 'w-full'"
      >
        <NewQuoteIcon />
        <p class="whitespace-nowrap">{{ t('dashboard.new_quote') }}</p>
      </div>
      <label
        class="hidden lg:flex lg:cursor-pointer gap-4"
        for="dashboard-search"
        :class="searchFocused && 'w-full border-b border-grey-rare'"
      >
        <SearchIcon class="self-center" />
        <input
          v-model="search"
          class="outline-none text-xl text-right bg-transparent focus:text-left focus:w-full text-grey-secondary placeholder:text-grey-secondary"
          :class="locale === 'ka' ? 'w-16' : 'w-24'"
          id="dashboard-search"
          @focus="searchFocused = true"
          @blur="searchFocused = false"
          :placeholder="searchFocused ? t('dashboard.search_focused') : t('dashboard.search')"
        />
      </label>
    </div>
    <LoadingPageMini v-if="quotesStore.loading" />
    <ul class="space-y-8">
      <PostItem v-for="quote in computedQuotes" :key="quote.id" :quote="quote" />
    </ul>
    <NewQuote v-if="quotesModal" :modalOpen="quotesModal" @close-modal="closeQuotesModal" />
  </section>
</template>

<script setup lang="ts">
import NewQuoteIcon from '@/components/icons/NewQuoteIcon.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import NewQuote from '@/components/dashboard/NewQuote.vue'
import PostItem from '@/components/dashboard/post/PostItem.vue'
import LoadingPageMini from '@/ui/LoadingPageMini.vue'

import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuotesStore } from '@/stores/QuotesStore'
import { onMounted } from 'vue'
import { onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { echo } from '@/echo'

import type { BroadcastLike, BroadcastComment } from '@/types'

const { t, locale } = useI18n()
const quotesStore = useQuotesStore()
const route = useRoute()
const router = useRouter()

const searchFocused = ref(false)
const quotesModal = ref(false)
const container = ref<HTMLElement | null>(null)
const search = ref('')
const debounceTimer = ref<number | null>(null)

const computedQuotes = computed(() => quotesStore.quotes)

function openQuotesModal() {
  quotesModal.value = true
}

function closeQuotesModal() {
  quotesModal.value = false
}

function handleScroll() {
  if (container.value && container.value.getBoundingClientRect().bottom <= window.innerHeight)
    quotesStore.loadMore(route.query)
}

watch(
  () => route.query,
  (val) => {
    quotesStore.getQuotes(val)
    if (!val.quote && !val['movie.name']) search.value = ''
  }
)
watch(search, (value, oldValue) => {
  let movieSearchTerm = ''
  let quoteSearchTerm = ''

  const atIndex = value.indexOf('@')
  if (atIndex !== -1) {
    const nextDelimiterIndex = value.indexOf('#', atIndex)
    if (nextDelimiterIndex !== -1) {
      movieSearchTerm = value.substring(atIndex + 1, nextDelimiterIndex).trim()
    } else {
      movieSearchTerm = value.substring(atIndex + 1).trim()
    }
  }

  const hashtagIndex = value.indexOf('#')
  if (hashtagIndex !== -1) {
    const nextDelimiterIndex = value.indexOf('@', hashtagIndex)
    if (nextDelimiterIndex !== -1) {
      quoteSearchTerm = value.substring(hashtagIndex + 1, nextDelimiterIndex).trim()
    } else {
      quoteSearchTerm = value.substring(hashtagIndex + 1).trim()
    }
  }

  if (value !== oldValue) {
    clearTimeout(debounceTimer.value!)
    debounceTimer.value = setTimeout(() => {
      router.push({
        query: {
          'movie.name': movieSearchTerm ?? null,
          quote: quoteSearchTerm ?? null
        }
      })
    }, 500)
  }
})

function handleQuoteLiked(data: BroadcastLike) {
  quotesStore.updateQuoteLikes(data.data)
}

function handleQuoteCommented(data: BroadcastComment) {
  quotesStore.updateQuoteComments(data.data)
}

onMounted(() => {
  echo.channel('quotes').listen('QuoteLiked', handleQuoteLiked)
  echo.channel('quotes').listen('QuoteCommented', handleQuoteCommented)
  quotesStore.getQuotes(route.query)
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  echo.channel('quotes').stopListening('QuoteLiked', handleQuoteLiked)
  echo.channel('quotes').stopListening('QuoteCommented', handleQuoteCommented)
  window.removeEventListener('scroll', handleScroll)
})
</script>
