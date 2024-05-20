<template>
  <MainModal :modalOpen="moviesStore.viewQuoteModal.visible" @close-modal="closeModal">
    <div
      class="bg-[#0D0B14] h-full lg:max-h-[50rem] overflow-y-auto scrollbar-none lg:ml-[calc(25%_+80px)] xl:ml-[calc(25%_+16px)] lg:rounded-xl lg:w-[55%]"
    >
      <header class="flex items-center justify-between p-7 border-b border-[#EFEFEF33]">
        <div class="rounded-llg flex items-center justify-center gap-6">
          <EditIcon class="lg:hover:brightness-75 cursor-pointer" />
          <span class="bg-grey-main w-[1px] h-5"></span>
          <TrashIcon class="lg:hover:brightness-75 cursor-pointer" />
        </div>
        <h1 class="hidden lg:block capitalize font-semibold text-xl">
          {{ t('show.view_quote') }}
        </h1>
        <XIcon @click="closeModal" class="lg:cursor-pointer" />
      </header>
      <main class="p-7 space-y-6">
        <!-- WORKING ON THIS, WILL DELETE -->
        <!-- <section class="flex items-center gap-5">
          <div class="w-10 h-10 lg:h-14 lg:w-14 shrink-0">
            <img
              v-if="userData?.profile_image"
              :src="userData?.profile_image"
              class="object-cover rounded-full h-full w-full"
            />
            <img v-else src="@/assets/avatar.png" class="object-cover h-full w-full" />
          </div>
          <h2>{{ userData?.username }}</h2>
        </section> -->
      </main>
    </div>
  </MainModal>
</template>

<script setup lang="ts">
import XIcon from '@/components/icons/XIcon.vue'
import MainModal from '@/components/dashboard/modals/MainModal.vue'
import { useI18n } from 'vue-i18n'

import { useMoviesStore } from '@/stores/MoviesStore'

import EditIcon from '../icons/EditIcon.vue'
import TrashIcon from '../icons/TrashIcon.vue'

const { t } = useI18n()
const moviesStore = useMoviesStore()

function closeModal() {
  moviesStore.closeViewQuoteModal()
}
</script>
