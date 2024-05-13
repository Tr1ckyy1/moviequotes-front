<template>
  <Transition
    enter-active-class="duration-100"
    leave-active-class="duration-100"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="modalOpen"
      @click.self="closeModal"
      class="fixed inset-0 bg-black/30 z-[55] lg:z-40 lg:top-0 lg:pt-24 lg:pb-4 no-scroll lg:px-14"
    >
      <form
        class="bg-[#0D0B14] h-full lg:max-h-[50rem] overflow-y-auto scrollbar-none lg:ml-[calc(25%_+80px)] xl:ml-[25%] lg:rounded-xl lg:w-[55%]"
      >
        <header class="flex items-center p-7 border-b border-[#EFEFEF33]">
          <h1 class="capitalize font-semibold text-xl mx-auto">
            {{ t('dashboard.new_quote') }}
          </h1>
          <XIcon @click="closeModal" class="lg:cursor-pointer" />
        </header>
        <main class="p-7 space-y-6">
          <section class="flex items-center gap-5">
            <div class="w-10 h-10 lg:h-14 lg:w-14 shrink-0">
              <img
                v-if="userData?.profileImage"
                :src="userData?.profileImage"
                class="object-cover rounded-full h-full w-full"
              />
              <img v-else src="@/assets/avatar.png" class="object-cover h-full w-full" />
            </div>
            <h2>{{ userData?.username }}</h2>
          </section>
          <div class="relative">
            <textarea
              class="resize-none w-full bg-transparent border border-grey-main pl-4 pr-11 py-2 rounded-[4px] text-white italic placeholder:text-grey-main outline-none scrollbar-thin scrollbar-track-transparent scrollbar-thumb-dark-third"
              placeholder="New quote"
              rows="3"
            ></textarea>
            <p class="absolute right-4 top-4 bg-dark-main">Eng</p>
          </div>
          <div class="relative">
            <textarea
              class="resize-none w-full bg-transparent border border-grey-main pl-4 pr-11 py-2 rounded-[4px] text-white italic placeholder:text-grey-main outline-none scrollbar-thin scrollbar-track-transparent scrollbar-thumb-dark-third"
              placeholder="ახალი ციტატა"
              rows="3"
            ></textarea>
            <p class="absolute right-4 top-4 bg-dark-main">ქარ</p>
          </div>

          <div class="border border-grey-main flex items-center px-4 py-8 gap-4">
            <CameraIcon />
            <p class="lg:hidden">{{ t('modal.upload_image') }}</p>
            <p class="hidden lg:block">{{ t('modal.upload_image_desktop') }}</p>
            <label
              for="file-upload"
              class="ml-auto lg:ml-0 bg-[#9747FF66] rounded-sm p-2.5 text-center lg:cursor-pointer lg:hover:bg-white lg:hover:text-[#9747FF] lg:hover:duration-300"
              type="button"
            >
              {{ t('modal.choose_file') }}
            </label>
            <input id="file-upload" type="file" accept="image/*" hidden />
          </div>
          <div class="border border-black flex items-center px-4 py-8 gap-4 bg-black">
            <MovieListIcon />
            <p>{{ t('modal.choose_movie') }}</p>
            <div class="ml-auto lg:cursor-pointer">
              <ArrowDown width="16" height="16" />
            </div>
          </div>
          <button
            class="bg-red-main w-full p-3 rounded-md lg:hover:bg-white lg:hover:text-red-main lg:hover:duration-300"
          >
            {{ t('modal.post') }}
          </button>
        </main>
      </form>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import CameraIcon from '@/components/icons/CameraIcon.vue'
import MovieListIcon from '@/components/icons/MovieListIcon.vue'
import ArrowDown from '@/components/icons/ArrowDown.vue'
import XIcon from '@/components/icons/XIcon.vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/AuthStore'
import { storeToRefs } from 'pinia'

const { userData } = storeToRefs(useAuthStore())

const { t } = useI18n()

const emit = defineEmits<{
  (e: 'close-modal'): void
}>()

function closeModal() {
  emit('close-modal')
}

defineProps<{
  modalOpen: boolean
}>()
</script>
