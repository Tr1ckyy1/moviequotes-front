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
    <div class="bg-dark-third min-h-60 flex flex-col justify-center px-7 gap-4">
      <label for="edit-password-modal" class="flex flex-col gap-2"
        >{{ t('profile.new_password') }}
        <div class="relative">
          <input
            class="bg-grey-secondary border border-grey-secondary rounded-md py-2 px-3 outline-none text-[#212529] w-full"
            id="edit-password-modal"
            :type="passwordTypeComputed"
            ref="passwordRef"
          />
          <ShowIcon
            @click="passwordIsVisible = false"
            class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            v-if="passwordIsVisible"
          />
          <HideIcon
            @click="passwordIsVisible = true"
            class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            v-else
          />
        </div>
      </label>

      <label for="edit-password-confirm-modal" class="flex flex-col gap-2"
        >{{ t('profile.new_password_confirm') }}
        <div class="relative">
          <input
            class="bg-grey-secondary border border-grey-secondary rounded-md py-2 px-3 outline-none text-[#212529] w-full"
            id="edit-password-confirm-modal"
            :type="confirmPasswordTypeComputed"
            ref="confirmPasswordRef"
          />
          <ShowIcon
            @click="confirmPasswordIsVisible = false"
            class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            v-if="confirmPasswordIsVisible"
          />
          <HideIcon
            @click="confirmPasswordIsVisible = true"
            class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            v-else
          />
        </div>
      </label>
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
import ShowIcon from '../icons/ShowIcon.vue'
import HideIcon from '../icons/HideIcon.vue'
import { updateUserProfile } from '@/services/api/user'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { logout } from '@/services/api/auth'

const { t } = useI18n()

const passwordIsVisible = ref(false)
const confirmPasswordIsVisible = ref(false)
const passwordType = ref('password')
const confirmPasswordType = ref('password')
const passwordRef = ref<HTMLInputElement | null>(null)
const confirmPasswordRef = ref<HTMLInputElement | null>(null)
const confirmModal = ref(false)
const store = ref({
  pass: '',
  confirm: ''
})
const loading = ref(false)

const { setToast } = useAuthStore()

const emit = defineEmits<{
  (e: 'close'): void
}>()

function cancel() {
  emit('close')
}

const passwordTypeComputed = computed(() => {
  if (passwordType.value === 'password') return passwordIsVisible.value ? 'text' : 'password'
  return passwordType.value
})
const confirmPasswordTypeComputed = computed(() => {
  if (confirmPasswordType.value === 'password')
    return confirmPasswordIsVisible.value ? 'text' : 'password'
  return confirmPasswordType.value
})

function openConfirmModal() {
  if (passwordRef.value) store.value.pass = passwordRef.value.value
  if (confirmPasswordRef.value) store.value.confirm = confirmPasswordRef.value.value
  confirmModal.value = true
}
function closeConfirmModal() {
  if (passwordRef.value) passwordRef.value.focus()
  confirmModal.value = false
}

async function updateUserData() {
  try {
    loading.value = true
    const { data } = await updateUserProfile({
      password: store.value.pass,
      password_confirmation: store.value.confirm
    })
    logout()
    setToast({ open: true, text: data.password_message, mode: 'success' })
  } catch (err: any) {
    if (err.response?.data?.errors?.password || err.response?.data?.errors?.password_confirmation) {
      let errorText = ''
      if (err.response?.data?.errors?.password) {
        errorText = Array.isArray(err.response.data.errors.password)
          ? err.response.data.errors.password[0]
          : err.response.data.errors.password
      } else if (err.response?.data?.errors?.password_confirmation) {
        errorText = Array.isArray(err.response.data.errors.password_confirmation)
          ? err.response.data.errors.password_confirmation[0]
          : err.response.data.errors.password_confirmation
      }
      setToast({
        open: true,
        text: errorText,
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

  if (passwordRef.value) passwordRef.value.focus()
})
</script>
