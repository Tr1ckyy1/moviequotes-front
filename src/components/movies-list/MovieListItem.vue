<template>
  <div class="space-y-4 cursor-pointer">
    <!-- <img :src="url" class="rounded-llg w-full object-cover" /> -->
    <img src="@/assets/landing-image-1-desktop.png" class="rounded-llg w-full object-cover h-96" />
    <h1 class="text-2xl font-medium">
      {{ movie.title }} <span>({{ movie.year }})</span>
    </h1>
    <p class="flex items-center text-xl gap-4">{{ movie.totalQuotes }} <QuotesIcon /></p>
  </div>
</template>

<script setup lang="ts">
import QuotesIcon from '@/components/icons/QuotesIcon.vue'
import type { Movie } from '@/types'

type Props = {
  movie: Movie
}

defineProps<Props>()
</script>
