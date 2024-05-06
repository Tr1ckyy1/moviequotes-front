<template>
  <section
    class="bg-gradient-to-r from-[#181623] via-[#191725] to-[#0D0B14] px-8 lg:px-6 py-6 space-y-6 w-full max-w-[600px] h-full lg:h-auto lg:min-h-fit lg:max-h-[90%] lg:overflow-y-auto overflow-y-scroll scrollbar-none lg:from-modal-bg lg:via-modal-bg lg:to-modal-bg"
  >
    <CancelIcon @click="closeModal" class="ml-auto lg:cursor-pointer" />
    <div class="text-center space-y-4 lg:w-2/3 lg:mx-auto">
      <h1 class="text-white text-2xl sm:text-4xl whitespace-nowrap">{{ title }}</h1>
      <p class="text-[#6C757D]">{{ description }}</p>
    </div>
    <slot></slot>
  </section>
</template>

<script setup lang="ts">
import CancelIcon from '@/components/icons/CancelIcon.vue'

defineProps<{
  title: string
  description: string
}>()
const emit = defineEmits<{
  (e: 'close-modal'): void
}>()
function closeModal() {
  emit('close-modal')
}
</script>
