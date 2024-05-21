<template>
  <li class="bg-dark-main px-7 py-4 space-y-6">
    <div
      class="space-y-6 border-b border-[#EFEFEF33] pb-6 lg:space-y-0 lg:flex lg:items-center lg:gap-6"
    >
      <img :src="quote.image" class="w-full lg:w-56 rounded-sm h-36 object-cover" />
      <p class="text-grey-secondary text-2xl break-all overflow-y-scroll max-h-32 scrollbar">
        "{{ quote.quote[locale as Language] }}"
      </p>
      <QuoteDotsModal :id="quote.id" class="hidden lg:block" />
    </div>
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-6 pb-4">
        <div class="flex gap-4 items-center">
          <span class="text-xl">{{ quote.comments }}</span>
          <CommentsIcon />
        </div>
        <div class="flex gap-4 items-center text-xl">
          <span class="text-xl">{{ quote.likes }}</span>
          <LikesIcon />
        </div>
      </div>
      <QuoteDotsModal :id="quote.id" class="lg:hidden" />
    </div>
  </li>
</template>

<script setup lang="ts">
import type { Language, QuotesData } from '@/types'
import CommentsIcon from '../icons/CommentsIcon.vue'
import LikesIcon from '../icons/LikesIcon.vue'
import QuoteDotsModal from './QuoteDotsModal.vue'
import { useI18n } from 'vue-i18n'

defineProps<{
  quote: QuotesData
}>()

const { locale } = useI18n()
</script>
