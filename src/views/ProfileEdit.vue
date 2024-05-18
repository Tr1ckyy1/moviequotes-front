<template>
  <div>
    <LoadingPage v-if="isSubmitting" />
    <ProfileUserModal class="lg:hidden" v-if="editUsernameModal" @close="closeEditUsername" />
    <ProfilePasswordModal
      class="lg:hidden"
      v-else-if="editPasswordModal"
      @close="closeEditPassword"
    />

    <form v-else @submit="upload" enctype="multipart/form-data">
      <div class="p-7 pt-0 lg:px-0">
        <h1 class="text-2xl hidden lg:block">{{ t('profile.my_profile') }}</h1>
        <ArrowLeft class="lg:hidden" @click="goBack" width="16" height="16" />
      </div>

      <div
        class="bg-dark-third min-h-screen lg:min-h-fit py-5 px-7 lg:mt-32 lg:bg-dark-main lg:rounded-xl lg:relative lg:py-20"
      >
        <div
          class="flex justify-center flex-col items-center gap-2 lg:absolute lg:top-0 lg:-translate-y-1/2 lg:left-1/2 lg:-translate-x-1/2"
        >
          <div class="w-48 h-48 shrink-0">
            <img
              ref="imageRef"
              v-if="authStore.userData?.profile_image"
              :src="authStore.userData?.profile_image"
              class="object-cover rounded-full h-full w-full"
            />
            <img
              v-else
              :src="defaultAvatar"
              class="object-cover h-full w-full rounded-full"
              ref="imageRef"
            />
          </div>
          <label for="upload-new-photo" class="lg:cursor-pointer">
            {{ t('profile.upload_new_photo') }}
            <Field
              @change="changeImage"
              name="profile_image"
              type="file"
              accept="image/*"
              hidden
              id="upload-new-photo"
            />
          </label>
        </div>

        <ul class="mt-20 space-y-8 lg:w-2/3 lg:mx-auto">
          <li class="border-b border-grey-secondary pb-3 lg:border-none">
            <p class="text-lg">
              {{ t('auth.username_input.label') }}
            </p>
            <div class="flex items-center gap-4 mt-1 lg:mt-2">
              <p
                class="lg:w-3/4 shrink-0 lg:bg-grey-secondary lg:text-[#212529] lg:px-4 lg:py-2 lg:rounded-md"
              >
                {{ authStore.userData.username }}
              </p>
              <button
                v-if="!editUsernameInput"
                @click="openEditUsername"
                class="text-grey-secondary text-lg ml-auto lg:ml-0"
                type="button"
              >
                {{ t('profile.edit') }}
              </button>
            </div>

            <ProfileUserInput
              :open="editUsernameInput"
              :error="errors.username"
              :value="values.username"
            />
          </li>
          <li class="border-b border-grey-secondary pb-3 space-y-2 lg:border-none lg:space-y-3">
            <p class="text-lg">
              {{ t('auth.email_input.label') }}
            </p>
            <p
              class="text-grey-secondary lg:w-3/4 lg:bg-grey-secondary lg:text-[#212529] lg:px-4 lg:py-2 lg:rounded-md"
            >
              {{ authStore.userData.email }}
            </p>
          </li>
          <li class="border-b border-grey-secondary pb-3 lg:border-none">
            <p class="text-lg">
              {{ t('auth.password_input.label') }}
            </p>
            <div class="flex items-center gap-4 mt-1 lg:mt-2">
              <p
                class="text-grey-secondary/50 lg:w-3/4 shrink-0 lg:bg-grey-secondary lg:text-[#212529] lg:px-4 lg:py-2 lg:rounded-md"
              >
                ••••••••••••
              </p>
              <button
                @click="openEditPassword"
                v-if="shouldShowPasswordEdit"
                class="text-grey-secondary text-lg ml-auto lg:ml-0"
                type="button"
              >
                {{ t('profile.edit') }}
              </button>
            </div>
            <ProfilePasswordInput
              :open="editPasswordInput"
              :passwordError="errors.password"
              :confirmError="errors.password_confirmation"
              :passwordValue="values.password"
              :confirmValue="values.password_confirmation"
            />
          </li>
        </ul>
      </div>
      <div class="ml-auto w-fit lg:flex gap-3 mt-10 hidden" v-if="buttonsVisible">
        <button
          type="button"
          @click="cancelForm"
          class="border border-transparent bg-transparent py-2 px-4 rounded-md hover:bg-white hover:text-dark-secondary duration-300"
        >
          {{ t('profile.cancel') }}
        </button>
        <button
          class="flex justify-center gap-4 items-center bg-red-main py-2 px-4 rounded-md border border-red-main enabled:hover:bg-white enabled:hover:text-red-main enabled:hover:border-red-main enabled:duration-300 disabled:cursor-not-allowed"
          :disabled="isSubmitting"
        >
          <LoadingSpinnerMini v-if="isSubmitting" />
          {{ isSubmitting ? t('loading') : t('profile.save_changes') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import ArrowLeft from '@/components/icons/ArrowLeft.vue'
import { useAuthStore } from '@/stores/AuthStore'
import { useForm, Field } from 'vee-validate'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import ProfileUserModal from '@/components/profile/ProfileUserModal.vue'
import ProfileUserInput from '@/components/profile/ProfileUserInput.vue'
import ProfilePasswordModal from '@/components/profile/ProfilePasswordModal.vue'
import ProfilePasswordInput from '@/components/profile/ProfilePasswordInput.vue'
import { onMounted } from 'vue'
import { watchEffect } from 'vue'
import { getUser, updateUserProfile } from '@/services/api/user'
import { watch } from 'vue'
import { computed } from 'vue'
import LoadingPage from '@/ui/LoadingPage.vue'
import defaultAvatar from '@/assets/avatar-big.png'
import { logout } from '@/services/api/auth'

const { t, locale } = useI18n()

const { handleSubmit, setFieldError, errors, values, resetField, validate, isSubmitting } =
  useForm()

const authStore = useAuthStore()
const router = useRouter()

const editUsernameModal = ref(false)
const editUsernameInput = ref(false)
const editPasswordModal = ref(false)
const editPasswordInput = ref(false)
const imageRef = ref<HTMLImageElement | null>(null)

const shouldShowPasswordEdit = computed(() => {
  if (authStore.userData.google_id) return false
  if (!authStore.userData.google_id && editPasswordInput.value) return false
  return true
})

const buttonsVisible = computed(() => {
  if (values.username || values.password || values.profile_image) return true
  return false
})

const upload = handleSubmit(async (values) => {
  try {
    const { data } = await updateUserProfile(values)
    const {
      data: { data: user }
    } = await getUser()

    authStore.setToast({
      open: true,
      text: data.message ?? data,
      mode: 'success'
    })

    window.scrollTo(0, 0)

    authStore.setUserData({
      ...authStore.userData,
      username: user.username,
      profile_image: user.profile_image
    })

    if (values.password && data.password_message) {
      logout()
      authStore.setToast({ open: true, text: data.password_message, mode: 'success' })
    }

    if (editUsernameInput.value) editUsernameInput.value = false
    if (editPasswordInput.value) editPasswordInput.value = false
    resetField('profile_image')
  } catch (error: any) {
    if (error.response?.data?.error && error.response?.status === 403) {
      authStore.setToast({
        open: true,
        text: error.response?.data?.error,
        mode: 'error'
      })
    }
    if (error.response?.data?.errors) {
      for (const fieldName in error.response.data.errors) {
        if (fieldName === 'profile_image')
          authStore.setToast({
            open: true,
            text: error.response.data.errors.profile_image[0],
            mode: 'error'
          })
        else setFieldError(fieldName, error.response.data.errors[fieldName])
      }
    }
  }
})

function cancelForm() {
  if (editUsernameInput.value) editUsernameInput.value = false
  if (editPasswordInput.value) editPasswordInput.value = false
  if (values.profile_image && imageRef.value) {
    imageRef.value.src = authStore.userData.profile_image ?? defaultAvatar
    resetField('profile_image')
  }
}

function goBack() {
  router.go(-1)
}

function openEditUsername() {
  if (window.innerWidth <= 1024) {
    editUsernameModal.value = true
  } else {
    editUsernameInput.value = true
  }
}

function closeEditUsername() {
  editUsernameModal.value = false
}

function openEditPassword() {
  if (window.innerWidth <= 1024) {
    editPasswordModal.value = true
  } else {
    editPasswordInput.value = true
  }
}

function closeEditPassword() {
  editPasswordModal.value = false
}

function changeImage(event: InputEvent) {
  if (window.innerWidth > 1024) {
    const target = event.target as HTMLInputElement
    if (target.files && target.files[0]) {
      const reader = new FileReader()
      reader.onload = function (e) {
        if (imageRef.value && e.target) imageRef.value.src = e.target.result as string
      }
      reader.readAsDataURL(target.files[0])
    }
  } else upload()
}

watch(locale, () => {
  validate()
})

watch(values, (val) => {
  if (val.username === '') resetField('username')
  if (val.password === '') resetField('password')
  if (val.password_confirmation === '') resetField('password_confirmation')
})

onMounted(() => {
  watchEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        if (editUsernameModal.value) closeEditUsername()
        if (editPasswordModal.value) closeEditPassword()
      } else {
        if (editUsernameInput.value) editUsernameInput.value = false
        if (editPasswordInput.value) editPasswordInput.value = false
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })
})
</script>
