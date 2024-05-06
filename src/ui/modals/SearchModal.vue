<template>
  <Transition
    enter-active-class="duration-300"
    leave-active-class="duration-300"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      @click.self="closeModal"
      class="fixed inset-0 bg-black/50 z-[299] block lg:hidden"
      v-if="modalOpen"
    ></div>
  </Transition>
  <Transition
    enter-active-class="duration-300"
    leave-active-class="duration-300"
    enter-from-class="-translate-x-full"
    leave-to-class="-translate-x-full"
  >
    <div
      class="lg:hidden text-white fixed top-0 left-0 bg-[#11101A] h-4/5 z-[300] w-full"
      v-if="modalOpen"
    >
      <header class="flex border-b border-[#EFEFEF4D] px-7 py-5 items-center gap-6">
        <ArrowLeft class="w-4 h-4" @click="closeModal" />
        <input
          type="text"
          class="outline-none bg-transparent placeholder:text-white w-full"
          :placeholder="searchText"
        />
      </header>
      <main class="text-[#CED4DA] px-16 py-7 space-y-7">
        <p>{{ searchAt }}</p>
        <p>{{ searchHashtag }}</p>
      </main>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import ArrowLeft from '@/components/icons/ArrowLeft.vue'

defineProps<{
  modalOpen: boolean
  searchText: string
  searchAt: string
  searchHashtag: string
}>()

const emit = defineEmits<{
  (e: 'close-modal'): void
}>()

function closeModal() {
  emit('close-modal')
}
</script>
