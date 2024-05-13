<template>
  <Transition
    enter-active-class="duration-150"
    leave-active-class="duration-150"
    enter-from-class="-translate-y-full"
    leave-to-class="-translate-y-full"
  >
    <div
      v-if="toast.open"
      class="w-[90%] border fixed top-20 left-1/2 -translate-x-1/2 rounded-[4px] p-4 flex justify-between items-center gap-1 z-[70]"
      :class="
        toast.mode === 'error' ? 'bg-[#ffe4e4] border-[#f1afaa]' : 'bg-[#D1E7DD] border-[#BADBCC]'
      "
    >
      <div class="flex items-center gap-3">
        <div
          class="w-6 h-6 rounded-full shrink-0 flex items-center justify-center"
          :class="toast.mode === 'error' ? 'bg-red-main' : 'bg-[#0F5132]'"
        >
          <XIcon v-if="toast.mode === 'error'" color="#fff" width="10" height="10" />
          <CheckmarkIcon v-else color="white" width="12" height="12" />
        </div>
        <h1 :class="toast.mode === 'error' ? 'text-red-main' : 'text-[#0F5132]'">
          {{ toast.text }}
        </h1>
      </div>
      <XIcon @click="closeToast" color="#00000060" width="16" height="16" class="shrink-0" />
    </div>
  </Transition>
</template>
<script setup lang="ts">
import type { Toast } from '@/types'
import CheckmarkIcon from '../icons/CheckmarkIcon.vue'
import XIcon from '../icons/XIcon.vue'

defineProps<{
  toast: Toast
}>()

const emit = defineEmits<{
  (e: 'cancel'): void
}>()

function closeToast() {
  emit('cancel')
}
</script>
