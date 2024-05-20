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
      <PostItem v-for="quote in quotesStore.quotes" :key="quote.id" :quote="quote" />
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

import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuotesStore } from '@/stores/QuotesStore'
import { onMounted } from 'vue'
import { onUnmounted } from 'vue'

const { t, locale } = useI18n()
const quotesStore = useQuotesStore()

const searchFocused = ref(false)
const quotesModal = ref(false)
const container = ref<HTMLElement | null>(null)

function openQuotesModal() {
  quotesModal.value = true
}

function closeQuotesModal() {
  quotesModal.value = false
}

function handleScroll() {
  if (container.value && container.value.getBoundingClientRect().bottom <= window.innerHeight)
    quotesStore.loadMore()
}

onMounted(() => {
  quotesStore.getQuotes()
  window.addEventListener('scroll', handleScroll)
  // Now you can perform operations on quotesScrollComponent.value
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
