<template>
  <TheHeader />
  <main
    class="pt-7 lg:px-14 bg-dark-secondary text-white lg:flex min-h-screen md:gap-20 xl:gap-4"
    :class="
      route.path.includes('movies-list') && ' overflow-y-scroll h-screen scrollbar-none no-scroll'
    "
  >
    <TheSidebar
      class="hidden lg:block lg:w-1/4"
      :class="route.path.includes('movies-list') && 'sticky top-0'"
    />
    <RouterView
      :class="route.path.includes('movies-list') ? 'w-full' : 'lg:w-[55%]'"
      class="pb-7"
    />
  </main>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import TheHeader from '@/ui/TheHeader.vue'
import TheSidebar from '@/ui/TheSidebar.vue'

const route = useRoute()
</script>
