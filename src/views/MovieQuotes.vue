<template>
  <TheHeader />
  <main class="pt-7 lg:px-14 bg-dark-secondary text-white lg:flex min-h-screen md:gap-20 xl:gap-0">
    <TheSidebar class="hidden lg:block lg:w-1/4" />
    <RouterView class="lg:w-[55%] pb-7" />
  </main>
</template>

<script setup lang="ts">
import TheHeader from '@/ui/TheHeader.vue'
import TheSidebar from '@/ui/TheSidebar.vue'
</script>
