<template>
  <Transition
    enter-active-class="duration-300"
    leave-active-class="duration-300"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      @click.self="closeModal"
      class="fixed inset-0 bg-black/50 z-[51] block lg:hidden"
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
      class="lg:hidden text-white fixed top-0 left-0 bg-dark-main z-[52]"
      :class="
        mode === 'sidebar'
          ? 'w-[90%] flex flex-col justify-between p-7 py-5 h-4/5 gap-6 overflow-y-auto'
          : 'w-full h-full'
      "
      v-if="modalOpen"
    >
      <slot></slot>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  modalOpen: boolean
  mode?: string
}>()

const emit = defineEmits<{
  (e: 'close-modal'): void
}>()

function closeModal() {
  emit('close-modal')
}
</script>
