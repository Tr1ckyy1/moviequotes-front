<template>
  <TheHeader />
  <main class="pt-5 lg:px-14 bg-dark-secondary text-white lg:grid lg:grid-cols-[1fr_2fr_1fr]">
    <TheSidebar class="hidden lg:block" />
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import TheHeader from '@/ui/TheHeader.vue'
import TheSidebar from '@/ui/TheSidebar.vue'
</script>
