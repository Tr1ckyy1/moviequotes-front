<template>
  <form @submit="upload">
    <div class="p-7 pt-0 lg:px-14">
      <h1 class="text-2xl hidden lg:block">{{ t('profile.my_profile') }}</h1>
      <ArrowLeft class="lg:hidden" @click="goBack" width="16" height="16" />
    </div>

    <ProfileEditModal v-if="editUsernameModal" @close="closeEditUsername" />
    <div
      v-else
      class="bg-dark-third min-h-screen lg:min-h-fit py-5 px-7 lg:mt-32 lg:bg-dark-main lg:relative lg:py-20"
    >
      <div
        class="flex justify-center flex-col items-center gap-2 lg:absolute lg:top-0 lg:-translate-y-1/2 lg:left-1/2 lg:-translate-x-1/2"
      >
        <div class="w-48 h-48 shrink-0">
          <img
            v-if="userData?.profileImage"
            :src="userData?.profileImage"
            class="object-cover rounded-full h-full w-full"
          />
          <img v-else src="@/assets/avatar.png" class="object-cover h-full w-full" />
        </div>
        <label for="upload-new-photo" class="lg:cursor-pointer">
          {{ t('profile.upload_new_photo') }}
          <Field name="profile_image" type="file" accept="image/*" hidden id="upload-new-photo" />
        </label>
      </div>

      <ul class="mt-20 space-y-8 lg:w-2/3 lg:mx-auto">
        <li class="border-b border-grey-secondary pb-3 space-y-1 lg:border-none lg:space-y-2">
          <p class="text-lg">
            {{ t('auth.username_input.label') }}
          </p>
          <div class="flex items-center gap-4">
            <p
              class="lg:w-3/4 shrink-0 lg:bg-grey-secondary lg:text-[#212529] lg:px-4 lg:py-2 lg:rounded-md"
            >
              {{ userData.username }}
            </p>
            <button
              @click="openEditUsername"
              class="text-grey-secondary text-lg ml-auto"
              type="button"
            >
              {{ t('profile.edit') }}
            </button>
          </div>
        </li>
        <li class="border-b border-grey-secondary pb-3 space-y-2 lg:border-none lg:space-y-3">
          <p class="text-lg">
            {{ t('auth.email_input.label') }}
          </p>
          <p
            class="text-grey-secondary lg:w-3/4 lg:bg-grey-secondary lg:text-[#212529] lg:px-4 lg:py-2 lg:rounded-md"
          >
            {{ userData.email }}
          </p>
        </li>
        <li class="border-b border-grey-secondary pb-3 space-y-1 lg:border-none lg:space-y-2">
          <p class="text-lg">
            {{ t('auth.password_input.label') }}
          </p>
          <div class="flex items-center gap-4">
            <p
              class="text-grey-secondary/50 lg:w-3/4 shrink-0 lg:bg-grey-secondary lg:text-[#212529] lg:px-4 lg:py-2 lg:rounded-md"
            >
              ••••••••••••
            </p>
            <button
              v-if="!userData.google"
              class="text-grey-secondary text-lg ml-auto"
              type="button"
            >
              {{ t('profile.edit') }}
            </button>
          </div>
        </li>
      </ul>
    </div>
    <div class="ml-auto w-fit lg:flex gap-3 mt-10 hidden">
      <button
        class="border border-transparent bg-transparent py-2 px-4 rounded-md hover:bg-white hover:text-dark-secondary duration-300"
      >
        {{ t('profile.cancel') }}
      </button>
      <button
        class="bg-red-main py-2 px-4 rounded-md border border-red-main hover:bg-white hover:text-red-main hover:border-red-main duration-300"
      >
        {{ t('profile.save_changes') }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import ArrowLeft from '@/components/icons/ArrowLeft.vue'
import { useAuthStore } from '@/stores/AuthStore'
import { storeToRefs } from 'pinia'
import { useForm, Field } from 'vee-validate'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import ProfileEditModal from '@/components/profile/ProfileEditModal.vue'

const { userData } = storeToRefs(useAuthStore())
const router = useRouter()
const { t } = useI18n()
const editUsernameModal = ref(false)

const { handleSubmit } = useForm()

const upload = handleSubmit(async (values) => {
  console.log(values)
})

function goBack() {
  router.go(-1)
}

function openEditUsername() {
  editUsernameModal.value = true
}

function closeEditUsername() {
  editUsernameModal.value = false
}
</script>
