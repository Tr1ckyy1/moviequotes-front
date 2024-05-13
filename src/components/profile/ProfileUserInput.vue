<template>
  <div class="space-y-2 mt-4 hidden lg:block" v-if="open">
    <label class="text-white" for="username-profile-desktop">{{ t('profile.new_username') }}</label>
    <div class="w-3/4 relative flex flex-col gap-2">
      <Field
        id="username-profile-desktop"
        type="text"
        name="username"
        class="outline-none shrink-0 text-[#212529] px-4 py-2 rounded-md border border-grey-secondary placeholder:text-grey-main bg-grey-secondary pr-9"
        :class="{
          'border-red-main': error
        }"
        :validateOnInput="true"
        :validateOnBlur="false"
        :rules="isUsernameValid"
      />
      <ErrorIcon class="absolute right-4 top-1/2 -translate-y-1/2" v-if="error" />
      <CheckmarkIcon
        class="absolute right-4 top-1/2 -translate-y-1/2"
        v-else-if="!error && value"
      />
    </div>
    <ErrorMessage class="text-red-main mt-2 block w-3/4" name="username" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ErrorMessage, Field } from 'vee-validate'
import CheckmarkIcon from '../icons/CheckmarkIcon.vue'
import ErrorIcon from '../icons/ErrorIcon.vue'

defineProps<{
  open: boolean
  error: string | undefined
  value: string | undefined
}>()

const { t } = useI18n()

function isUsernameValid(value: any) {
  if (value && value.trim()) {
    if (value.length < 3) return t('validation.auth.username.min')
    if (value.length > 15) return t('validation.auth.username.max')

    if (!/^[a-z0-9]+$/.test(value)) return t('validation.auth.username.regex')
  }
  return true
}
</script>
