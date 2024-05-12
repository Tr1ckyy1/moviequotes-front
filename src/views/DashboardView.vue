<template>
  <section class="lg:space-y-4 relative">
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
        :class="searchFocused && 'w-full'"
      >
        <SearchIcon class="self-center" />
        <input
          class="outline-none text-xl text-right bg-transparent focus:text-left focus:w-full text-grey-secondary placeholder:text-grey-secondary focus:border-b focus:border-grey-rare"
          :class="locale === 'ka' ? 'w-16' : 'w-24'"
          id="dashboard-search"
          @focus="searchFocused = true"
          @blur="searchFocused = false"
          :placeholder="searchFocused ? t('dashboard.search_focused') : t('dashboard.search')"
        />
      </label>
    </div>
    <div class="space-y-8">
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
    </div>
    <NewQuoteModal :modalOpen="quotesModal" @close-modal="closeQuotesModal" />
  </section>
</template>

<script setup lang="ts">
import NewQuoteIcon from '@/components/icons/NewQuoteIcon.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import NewQuoteModal from '@/components/dashboard/modals/NewQuoteModal.vue'
import PostItem from '@/components/dashboard/post/PostItem.vue'

import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const searchFocused = ref(false)
const quotesModal = ref(false)

function openQuotesModal() {
  quotesModal.value = true
}

function closeQuotesModal() {
  quotesModal.value = false
}
const { t, locale } = useI18n()
</script>
