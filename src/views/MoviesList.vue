<template>
  <section class="px-7 lg:px-0">
    <h1 class="text-2xl">{{ t('list.title', { number: 25 }) }}</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      <MovieListItem img="http://localhost:8000/storage/62/intersect.png" />
      <MovieListItem img="http://localhost:8000/storage/62/intersect.png" />
      <MovieListItem img="http://localhost:8000/storage/62/intersect.png" />
      <MovieListItem img="http://localhost:8000/storage/62/intersect.png" />
      <MovieListItem img="http://localhost:8000/storage/62/intersect.png" />
    </div>
  </section>
</template>

<script setup lang="ts">
import MovieListItem from '@/components/movies-list/MovieListItem.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
