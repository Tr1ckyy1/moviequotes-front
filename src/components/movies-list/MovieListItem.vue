<template>
  <div>
    <img :src="img" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  img: string
  title: string
  year: string | number
  totalQuotes: string | number
}>()
</script>
