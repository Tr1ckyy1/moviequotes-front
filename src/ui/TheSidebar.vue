<template>
  <aside class="space-y-10 text-white text-xl whitespace-nowrap">
    <div class="flex items-center gap-4">
      <div
        class="w-10 h-10 lg:h-14 lg:w-14 shrink-0 rounded-full"
        :class="{ 'border-2 border-red-main': route.name === 'edit-profile' }"
      >
        <img
          v-if="userData?.profile_image"
          :src="userData?.profile_image"
          class="object-cover rounded-full h-full w-full"
        />
        <img v-else src="@/assets/avatar.png" class="object-cover h-full w-full" />
      </div>
      <div>
        <h1 class="whitespace-normal break-all text-xl lg:text-2xl">
          {{ userData?.username }}
        </h1>
        <RouterLink
          :to="{ name: 'edit-profile' }"
          class="text-grey-secondary lg:cursor-pointer text-sm lg:-text-base"
          >{{ t('sidebar.edit_profile') }}</RouterLink
        >
      </div>
    </div>
    <RouterLink
      @click="clearQueries"
      :to="{ name: 'dashboard' }"
      class="flex items-center gap-7 lg:cursor-pointer lg:pl-3 w-fit text-xl lg:text-2xl"
    >
      <HomeIcon :currentPage="route.name === 'dashboard'" /><span>{{
        t('sidebar.news_feed')
      }}</span>
    </RouterLink>
    <RouterLink
      :to="{ name: 'movies-list' }"
      class="flex items-center gap-7 lg:cursor-pointer lg:pl-3 w-fit text-xl lg:text-2xl"
    >
      <MovieListIcon :currentPage="route.name === 'movies-list'" />
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
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const { userData } = storeToRefs(useAuthStore())

function clearQueries() {
  if (route.name === 'dashboard') router.replace({ query: {} })
}
</script>
