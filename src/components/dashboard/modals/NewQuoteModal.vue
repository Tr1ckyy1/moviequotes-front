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
      class="fixed inset-0 bg-black/30 z-[55] lg:z-40 lg:top-0 lg:pt-20 lg:grid lg:grid-cols-[1fr_2fr_1fr] lg:px-14"
    >
      <div class="hidden lg:block" @click="closeModal"></div>
      <slot></slot>
      <div class="hidden lg:block" @click="closeModal"></div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
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
