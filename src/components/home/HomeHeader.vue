<template>
  <header
    class="bg-gradient-to-r from-[#11101A] via-[#08080D] to-[#08080D] from-100% via-100% to-0%"
  >
    <nav class="flex justify-between p-5 lg:px-14 items-center">
      <RouterLink to="/" class="uppercase text-[#DDCCAA] font-semibold text-lg"
        >movie quotes</RouterLink
      >
      <div class="flex items-center gap-4">
        <ControlLanguages />
        <HomeAuthModals />
      </div>
    </nav>
    <section
      class="flex flex-col items-center gap-8 justify-center py-10 lg:py-32 bg-gradient-to-r from-[#11101A] via-[#08080D] to-[#08080D]"
    >
      <h1 class="text-[#DDCCAA] font-bold text-2xl text-center flex flex-col lg:text-6xl gap-2">
        {{ headerText }}
        <span>{{ headerTextSpan }}</span>
      </h1>
      <button
        @click="modalStore.openSignupModal"
        class="bg-red-main border border-red-main text-white rounded-[4px] py-2 px-4 lg:hover:bg-white lg:hover:text-red-main lg:hover:duration-300"
      >
        {{ getStarted }}
      </button>
    </section>
  </header>
</template>
<script setup lang="ts">
import HomeAuthModals from '@/components/home/HomeAuthModals.vue'
import ControlLanguages from '@/components/ControlLanguages.vue'
import { useModalStore } from '@/stores/ModalStore'
const modalStore = useModalStore()

defineProps<{
  headerText: string
  headerTextSpan: string
  getStarted: string
}>()
</script>
