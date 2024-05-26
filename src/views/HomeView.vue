<template>
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
      <div
        class="lg:hidden w-full h-screen bg-[url('@/assets/landing-image-1-mobile.png')] bg-cover bg-no-repeat bg-fixed"
      ></div>
      <div
        class="hidden lg:block w-full h-screen bg-[url('@/assets/landing-image-1-desktop.png')] bg-cover bg-no-repeat bg-fixed"
      ></div>
    </HomeParallax>
    <HomeParallax
      :quote="t('landing.movies.royal_tenenbaums.quote')"
      :movie="`${t('landing.movies.royal_tenenbaums.name')}, 2001`"
    >
      <div
        class="lg:hidden w-full h-screen bg-[url('@/assets/landing-image-2-mobile.png')] bg-cover bg-no-repeat bg-fixed"
      ></div>
      <div
        class="hidden lg:block w-full h-screen bg-[url('@/assets/landing-image-2-desktop.png')] bg-cover bg-no-repeat bg-fixed"
      ></div>
    </HomeParallax>
    <HomeParallax
      :quote="t('landing.movies.lotr.quote')"
      :movie="`${t('landing.movies.lotr.name')}, 2001`"
    >
      <div
        class="lg:hidden w-full h-screen bg-[url('@/assets/landing-image-3-mobile.png')] bg-cover bg-no-repeat bg-fixed"
      ></div>
      <div
        class="hidden lg:block w-full h-screen bg-[url('@/assets/landing-image-3-desktop.png')] bg-cover bg-no-repeat bg-fixed"
      ></div>
    </HomeParallax>
  </main>

  <footer
    class="text-main bg-gradient-to-r from-[#181623] via-dark-secondary to-[#0D0B14] py-4 px-7 lg:px-14 lg:text-lg text-base"
  >
    © 2024 {{ t('footer.text') }}.
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import HomeParallax from '@/components/home/HomeParallax.vue'
import HomeHeader from '@/components/home/HomeHeader.vue'

const { t } = useI18n()
</script>
