<template>
  <div class="mt-10 w-3/4 space-y-10 hidden lg:block" v-if="open">
    <div class="border border-grey-secondary/20 rounded-[4px] p-7">
      <p>{{ t('profile.password_should_contain') }}</p>
      <div class="flex items-center gap-2 mt-3">
        <div
          class="w-1 h-1 bg-[#9C9A9A] rounded-full"
          :class="!passwordError && passwordValue ? 'bg-profile-green' : 'bg-[#9C9A9A]'"
        ></div>
        <p
          class="text-sm"
          :class="!passwordError && passwordValue ? 'text-white' : 'text-[#9C9A9A]'"
        >
          {{ t('profile.password_min') }}
        </p>
      </div>
      <div class="flex items-center gap-2">
        <div
          class="w-1 h-1 bg-[#9C9A9A] rounded-full"
          :class="!passwordError && passwordValue ? 'bg-profile-green' : 'bg-[#9C9A9A]'"
        ></div>
        <p
          class="text-sm"
          :class="!passwordError && passwordValue ? 'text-white' : 'text-[#9C9A9A]'"
        >
          {{ t('profile.password_max') }}
        </p>
      </div>
    </div>
    <div class="space-y-2 hidden lg:block">
      <label class="text-white" for="password-profile-desktop">{{
        t('profile.new_password')
      }}</label>
      <div class="relative flex flex-col gap-2">
        <Field
          id="password-profile-desktop"
          :type="passwordTypeComputed"
          name="password"
          class="outline-none shrink-0 text-[#212529] px-4 py-2 rounded-md border-2 border-grey-secondary bg-grey-secondary pr-[60px] focus:border-grey-main"
          :class="{
            'border-red-main': passwordError,
            'border-profile-green': !passwordError && passwordValue
          }"
          :validateOnInput="true"
          :validateOnBlur="false"
          :rules="isPasswordValid"
        />
        <ErrorIcon class="absolute right-[38px] top-1/2 -translate-y-1/2" v-if="passwordError" />
        <CheckmarkIcon
          class="absolute right-[38px] top-1/2 -translate-y-1/2"
          v-if="!passwordError && passwordValue"
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
      <ErrorMessage class="text-red-main mt-2 block w-3/4" name="password" />
    </div>
    <div class="space-y-2 mt-4 hidden lg:block">
      <label class="text-white" for="password-confirm-profile-desktop">{{
        t('profile.new_password_confirm')
      }}</label>
      <div class="relative flex flex-col gap-2">
        <Field
          id="password-confirm-profile-desktop"
          :type="confirmPasswordTypeComputed"
          name="password_confirmation"
          class="outline-none shrink-0 text-[#212529] px-4 py-2 rounded-md pr-[60px] border-2 focus:border-grey-main bg-grey-secondary"
          :class="{
            'border-red-main': confirmError,
            'border-profile-green': !confirmError && confirmValue
          }"
          :validateOnInput="true"
          :validateOnBlur="false"
          :rules="isPasswordConfirmationValid"
        />
        <ErrorIcon class="absolute top-1/2 -translate-y-1/2 right-[38px]" v-if="confirmError" />
        <CheckmarkIcon
          class="absolute right-[38px] top-1/2 -translate-y-1/2"
          v-if="!confirmError && confirmValue"
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
      <ErrorMessage class="text-red-main mt-2 block w-3/4" name="password_confirmation" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ErrorMessage, Field } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import CheckmarkIcon from '../icons/CheckmarkIcon.vue'
import ErrorIcon from '../icons/ErrorIcon.vue'
import { ref } from 'vue'
import { computed } from 'vue'
import HideIcon from '../icons/HideIcon.vue'
import ShowIcon from '../icons/ShowIcon.vue'

const { t } = useI18n()
const props = defineProps<{
  open: boolean
  passwordError: string | undefined
  confirmError: string | undefined
  passwordValue: string | undefined
  confirmValue: string | undefined
}>()

const passwordIsVisible = ref(false)
const confirmPasswordIsVisible = ref(false)
const passwordType = ref('password')
const confirmPasswordType = ref('password')
const passwordTypeComputed = computed(() => {
  if (passwordType.value === 'password') return passwordIsVisible.value ? 'text' : 'password'
  return passwordType.value
})
const confirmPasswordTypeComputed = computed(() => {
  if (confirmPasswordType.value === 'password')
    return confirmPasswordIsVisible.value ? 'text' : 'password'
  return confirmPasswordType.value
})

function isPasswordValid(value: any) {
  if (value && value.trim()) {
    if (value.length < 8) return t('validation.auth.password.min')
    if (value.length > 15) return t('validation.auth.password.max')
    if (!/^[a-z0-9]+$/.test(value)) return t('validation.auth.password.regex')
  }
  return true
}

function isPasswordConfirmationValid(value: any) {
  if (
    (value && props.passwordValue !== value) ||
    (props.passwordValue && value !== props.passwordValue)
  ) {
    return t('validation.auth.password_confirmation.password_mismatch')
  }
  return true
}
</script>
