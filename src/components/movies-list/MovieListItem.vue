<template>
  <RouterLink
    :to="{ name: 'movie-show', params: { movieId: id } }"
    class="space-y-4 cursor-pointer"
  >
    <img :src="image" class="rounded-llg w-full object-cover h-80 lg:h-96" />
    <h1 class="text-2xl font-medium">
      {{ title }} <span>({{ year }})</span>
    </h1>
    <p class="flex items-center text-xl gap-4">{{ quotes }} <QuotesIcon /></p>
  </RouterLink>
</template>

<script setup lang="ts">
import QuotesIcon from '@/components/icons/QuotesIcon.vue'
import type { QuotesData } from '@/types'

defineProps<{
  title: string
  id: number
  year: number
  quotes: number | QuotesData[]
  image: string
}>()
</script>
