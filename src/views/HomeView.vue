<template>
  <ToastMessage
    v-if="authStore.googleErrorToast"
    :googleErrorToast="authStore.googleErrorToast"
    :message="authStore.toastMessage"
  />
  <HomeHeader
    :headerText="t('landing.header_text_line_one')"
    :headerTextSpan="t('landing.header_text_line_two')"
    :getStarted="t('landing.get_started')"
  />

  <main>
    <HomeParallax
      :quote="t('landing.movies.interstellar.quote')"
      :movie="`${t('landing.movies.interstellar.name')}, 2014`"
    >
      <img src="@/assets/landing-image-1-mobile.png" class="lg:hidden w-full object-cover" />

      <img src="@/assets/landing-image-1-desktop.png" class="hidden lg:block" />
    </HomeParallax>
    <HomeParallax
      :quote="t('landing.movies.royal_tenenbaums.quote')"
      :movie="`${t('landing.movies.royal_tenenbaums.name')}, 2001`"
    >
      <img src="@/assets/landing-image-2-mobile.png" class="lg:hidden w-full object-cover" />

      <img src="@/assets/landing-image-2-desktop.png" class="hidden lg:block" />
    </HomeParallax>
    <HomeParallax
      :quote="t('landing.movies.lotr.quote')"
      :movie="`${t('landing.movies.lotr.name')}, 2001`"
    >
      <img src="@/assets/landing-image-3-mobile.png" class="lg:hidden w-full object-cover" />

      <img src="@/assets/landing-image-3-desktop.png" class="hidden lg:block" />
    </HomeParallax>
  </main>

  <footer
    class="text-main bg-gradient-to-r from-[#181623] via-[#191725] to-[#0D0B14] py-4 px-7 lg:px-14 lg:text-lg text-base"
  >
    © 2024 {{ t('footer.text') }}.
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import HomeParallax from '@/components/home/HomeParallax.vue'

import { useAuthStore } from '@/stores/AuthStore'
import ToastMessage from '@/ui/ToastMessage.vue'
import HomeHeader from '@/components/home/HomeHeader.vue'

const { t } = useI18n()

const authStore = useAuthStore()
</script>
