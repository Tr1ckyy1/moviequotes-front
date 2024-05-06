<template>
  <Transition
    enter-active-class="duration-300"
    leave-active-class="duration-300"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="modalIsOpen"
      @click.self="closeModal"
      class="fixed inset-0 bg-black/10 z-[100] backdrop-blur flex items-center justify-center"
    >
      <slot></slot>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { modalIsOpen = false } = defineProps<{
  modalIsOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close-modal'): void
}>()
function closeModal() {
  emit('close-modal')
}
</script>
