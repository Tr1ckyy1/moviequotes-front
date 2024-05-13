<template>
  <div class="space-y-4 cursor-pointer">
    <!-- <img :src="url" class="rounded-llg w-full object-cover" /> -->
    <img src="@/assets/landing-image-1-desktop.png" class="rounded-llg w-full object-cover h-96" />
    <h1 class="text-2xl font-medium">
      {{ title }} <span>({{ year }})</span>
    </h1>
    <p class="flex items-center text-xl gap-4">{{ totalQuotes }} <QuotesIcon /></p>
  </div>
</template>

<script setup lang="ts">
import QuotesIcon from '@/components/icons/QuotesIcon.vue'
defineProps<{
  //   url: string
  title: string
  year: string | number
  totalQuotes: string | number
}>()
</script>
