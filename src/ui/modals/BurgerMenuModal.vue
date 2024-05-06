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
      class="flex lg:hidden fixed top-0 left-0 w-[90%] px-7 py-5 bg-[#11101A] h-4/5 flex-col justify-between z-[300]"
      v-if="modalOpen"
    >
      <TheSidebar />
      <button
        @click="logout"
        class="border border-white text-white py-2 px-4 rounded-[4px] w-fit block"
      >
        {{ logoutText }}
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import TheSidebar from '../TheSidebar.vue'

const emit = defineEmits<{
  (e: 'close-modal'): void
  (e: 'logout'): void
}>()

defineProps<{
  logoutText: string
  modalOpen: boolean
}>()

function closeModal() {
  emit('close-modal')
}

function logout() {
  emit('logout')
}
</script>
