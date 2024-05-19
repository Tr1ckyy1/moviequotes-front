<template>
  <li class="bg-dark-main px-7 py-4 space-y-6">
    <img :src="quote.image" class="w-full rounded-sm h-36 object-cover" />
    <p
      class="text-grey-secondary text-2xl border-b border-[#EFEFEF33] pb-6 break-all overflow-y-scroll max-h-32 scrollbar"
    >
      "{{ quote.quote[locale as Language] }}"
    </p>
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-6 pb-4">
        <div class="flex gap-4 items-center">
          <span class="text-xl">{{ quote.comments.length }}</span>
          <CommentsIcon />
        </div>
        <div class="flex gap-4 items-center text-xl">
          <span class="text-xl">{{ quote.likes.length }}</span>
          <LikesIcon />
        </div>
      </div>
      <ThreeDotsIcon class="cursor-pointer" />
    </div>
  </li>
</template>

<script setup lang="ts">
import type { Language, QuotesData } from '@/types'
import CommentsIcon from '../icons/CommentsIcon.vue'
import LikesIcon from '../icons/LikesIcon.vue'
import ThreeDotsIcon from '../icons/ThreeDotsIcon.vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

defineProps<{
  quote: QuotesData
}>()
</script>
