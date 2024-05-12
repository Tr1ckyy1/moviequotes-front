<template>
  <div
    v-if="confirmModal"
    @click.self="closeConfirmModal"
    class="fixed inset-0 bg-black/40 no-scroll z-[60] pt-32 overflow-y-auto"
  >
    <div class="bg-dark-third h-52 flex flex-col justify-center py-4">
      <h1 class="text-center mt-auto">
        {{ t('profile.make_changes_question') }}
      </h1>
      <div class="flex justify-between px-7 border-t border-grey-secondary/20 pt-4 mt-auto">
        <button @click="closeConfirmModal" class="py-2 px-3 rounded-[4px]" type="button">
          {{ t('profile.cancel') }}
        </button>
        <button
          @click="updateUserData"
          class="flex justify-center gap-4 items-center bg-red-main py-2 px-3 rounded-[4px]"
          type="button"
        >
          <LoadingSpinnerMini v-if="loading" />
          {{ loading ? t('loading') : t('profile.confirm') }}
        </button>
      </div>
    </div>
  </div>
  <form @submit.prevent="openConfirmModal" v-else>
    <div class="p-7 pt-0">
      <ArrowLeft class="" @click="cancel" width="16" height="16" />
    </div>
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
      <button type="button" @click="cancel" class="py-2 px-3 rounded-[4px]">
        {{ t('profile.cancel') }}
      </button>
      <button class="bg-red-main py-2 px-3 rounded-[4px]">
        {{ t('profile.edit') }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ArrowLeft from '../icons/ArrowLeft.vue'
import { updateUserProfile } from '@/services/api/user'
import { onUpdated } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'

const { t } = useI18n()

const inputRef = ref<HTMLInputElement | null>(null)
const confirmModal = ref(false)
const store = ref('')
const loading = ref(false)
const authStore = useAuthStore()

const emit = defineEmits<{
  (e: 'close'): void
}>()

function cancel() {
  emit('close')
}

function openConfirmModal() {
  if (inputRef.value) store.value = inputRef.value.value
  confirmModal.value = true
}
function closeConfirmModal() {
  if (inputRef.value) inputRef.value.focus()
  confirmModal.value = false
}

async function updateUserData() {
  try {
    loading.value = true
    const { data } = await updateUserProfile({
      username: store.value
    })
    authStore.setUserData({
      ...authStore.userData,
      username: store.value
    })
    authStore.setToast({
      open: true,
      text: data,
      mode: 'success'
    })
  } catch (err: any) {
    if (err.response?.data?.errors?.username) {
      authStore.setToast({
        open: true,
        text: err.response?.data?.errors?.username[0],
        mode: 'error'
      })
    }
  } finally {
    emit('close')
    loading.value = false
  }
}

onMounted(() => {
  window.scrollTo(0, 0)

  if (inputRef.value) inputRef.value.focus()
})

onUpdated(() => {
  if (inputRef.value) {
    inputRef.value.focus()
    inputRef.value.value = store.value
  }
})
</script>
