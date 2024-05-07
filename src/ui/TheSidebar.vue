<template>
  <aside class="space-y-10 text-white text-xl">
    <div class="flex items-center gap-4">
      <div class="w-10 h-10 lg:h-14 lg:w-14 shrink-0">
        <img
          v-if="userData?.profileImage"
          :src="userData?.profileImage"
          class="object-cover rounded-full h-full w-full"
        />
        <img v-else src="@/assets/avatar.png" class="object-cover h-full w-full" />
      </div>
      <div class="whitespace-nowrap">
        <h1>{{ userData?.username }}</h1>
        <p class="text-grey-secondary lg:cursor-pointer text-sm">{{ t('sidebar.edit_profile') }}</p>
      </div>
    </div>
    <RouterLink
      :to="{ name: 'dashboard' }"
      class="flex items-center gap-7 lg:cursor-pointer lg:pl-3 w-fit"
    >
      <HomeIcon :class="name === 'dashboard' ? 'fill-red-main' : 'fill-white'" /><span>{{
        t('sidebar.news_feed')
      }}</span>
    </RouterLink>
    <RouterLink to="/" class="flex items-center gap-7 lg:cursor-pointer lg:pl-3 w-fit">
      <MovieListIcon :class="name === 'dashboard' ? 'fill-red-main' : 'fill-white'" />
      <span>{{ t('sidebar.movies_list') }}</span>
    </RouterLink>
  </aside>
</template>

<script setup lang="ts">
import HomeIcon from '@/components/icons/HomeIcon.vue'
import MovieListIcon from '@/components/icons/MovieListIcon.vue'
import { useAuthStore } from '@/stores/AuthStore'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { name } = useRoute()
const { t } = useI18n()
const { userData } = storeToRefs(useAuthStore())
</script>
