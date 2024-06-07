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
      class="fixed inset-0 bg-black/50 lg:top-0 lg:pt-[93px] lg:pb-4 lg:px-14 text-white"
      :class="shouldCoverOtherModals ? 'z-[56] lg:z-[41]' : 'z-[55] lg:z-40'"
    >
      <slot></slot>
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
  shouldCoverOtherModals?: boolean
}>()
</script>
