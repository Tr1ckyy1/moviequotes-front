<template>
  <TheHeader />
  <main class="pt-7 lg:px-14 bg-dark-secondary text-white lg:flex min-h-screen md:gap-20 xl:gap-0">
    <TheSidebar class="hidden lg:block lg:w-1/4" />
    <RouterView :class="routerViewClass" class="pb-7" />
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TheHeader from '@/ui/TheHeader.vue'
import TheSidebar from '@/ui/TheSidebar.vue'

const route = useRoute()

const routerViewClass = computed(() => {
  if (route.name !== 'movies-list') return 'lg:w-[55%]'
  return 'w-full'
})
</script>
