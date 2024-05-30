<template>
  <div
    class="flex flex-col gap-6 items-center justify-center bg-gradient-to-r from-dark-main via-[#08080D] to-[#08080D] from-100% via-100% to-0% w-full py-10 px-4 min-h-screen text-white"
  >
    <img v-if="params.status === '403'" src="@/assets/Gandalf.png" />
    <div v-else class="flex flex-col items-center justify-center gap-6">
      <img src="@/assets/Frame.png" />
      <img src="@/assets/Ellipse.png" />
    </div>
    <div class="text-center space-y-2">
      <h1 class="font-bold text-5xl">{{ headerText }}</h1>
      <h2 class="font-medium text-2xl">{{ errorText }}</h2>
    </div>
    <button
      @click="goToHomepage"
      class="text-xl px-4 py-1.5 bg-red-main border border-red-main text-white rounded-[4px] lg:hover:bg-white lg:hover:text-red-main lg:hover:duration-300"
    >
      {{ t('errors.return_home') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import Cookies from 'js-cookie'

const { params } = useRoute()
const router = useRouter()
const { t, locale } = useI18n()
const localeCookie = Cookies.get('locale')

if (localeCookie) {
  locale.value = localeCookie
}

const headerText = computed(() => {
  if (params.status === '403') return t('errors.you_shall_not_pass')
  else return t('errors.whoops_message')
})

const errorText = computed(() => {
  if (params.status === '403') return t('errors.permission_denied')
  else return t('errors.cant_see_page')
})

function goToHomepage() {
  router.replace({ name: 'home' })
}
</script>
