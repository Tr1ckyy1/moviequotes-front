<template>
  <div class="bg-dark-third h-60 flex flex-col justify-center px-7 gap-2">
    <label for="edit-username-modal">{{ t('profile.new_username') }}</label>
    <input
      class="bg-grey-secondary border border-grey-secondary rounded-md py-2 px-3 outline-none text-[#212529]"
      id="edit-username-modal"
      type="text"
      ref="inputRef"
    />
  </div>
  <div class="p-7 flex justify-between">
    <button @click="cancel" class="py-2 px-3 rounded-[4px]" type="button">
      {{ t('profile.cancel') }}
    </button>
    <button class="bg-red-main py-2 px-3 rounded-[4px]" type="button">
      {{ t('profile.edit') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const inputRef = ref<HTMLInputElement | null>(null)

const emit = defineEmits<{
  (e: 'close'): void
}>()

function cancel() {
  emit('close')
}

onMounted(() => {
  window.scrollTo(0, 0)

  if (inputRef.value) inputRef.value.focus()
})
</script>
