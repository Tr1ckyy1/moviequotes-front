<template>
  <section>
    <div class="pb-5 px-7 lg:px-14">
      <h1 class="text-2xl hidden lg:block">{{ t('profile.my_profile') }}</h1>
      <ArrowLeft class="lg:hidden" @click="goBack" width="16" height="16" />
    </div>
    <form class="bg-dark-third h-screen lg:h-auto py-5 px-7 lg:mt-20 lg:bg-dark-main">
      <div class="flex justify-center flex-col items-center gap-2">
        <div class="w-48 h-48 lg:h-14 lg:w-14 shrink-0">
          <img
            v-if="userData?.profileImage"
            :src="userData?.profileImage"
            class="object-cover rounded-full h-full w-full"
          />
          <img v-else src="@/assets/avatar.png" class="object-cover h-full w-full" />
        </div>
        <label for="upload-new-photo">
          {{ t('profile.upload_new_photo') }}
          <input type="file" accept="image/*" hidden id="upload-new-photo" />
        </label>
      </div>

      <ul class="mt-20 space-y-8">
        <li class="border-b border-grey-secondary pb-3 space-y-1">
          <p class="text-lg">
            {{ t('auth.username_input.label') }}
          </p>
          <div class="flex items-center justify-between">
            <p>{{ userData.username }}</p>
            <button class="text-grey-secondary text-lg" type="button">
              {{ t('profile.edit') }}
            </button>
          </div>
        </li>
        <li class="border-b border-grey-secondary pb-3 space-y-1">
          <p class="text-lg">
            {{ t('auth.email_input.label') }}
          </p>
          <p class="text-grey-secondary">{{ userData.email }}</p>
        </li>
        <li class="border-b border-grey-secondary pb-3 space-y-1">
          <p class="text-lg">
            {{ t('auth.password_input.label') }}
          </p>
          <div class="flex items-center justify-between">
            <p class="text-grey-secondary/50">••••••••••••</p>
            <button v-if="!userData.google" class="text-grey-secondary text-lg" type="button">
              {{ t('profile.edit') }}
            </button>
          </div>
        </li>
      </ul>
    </form>
  </section>
</template>

<script setup lang="ts">
import ArrowLeft from '@/components/icons/ArrowLeft.vue'
import { useAuthStore } from '@/stores/AuthStore'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { userData } = storeToRefs(useAuthStore())
const router = useRouter()
const { t } = useI18n()

function goBack() {
  router.go(-1)
}
</script>
