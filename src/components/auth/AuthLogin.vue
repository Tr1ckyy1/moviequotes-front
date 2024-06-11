<template>
  <AuthModal
    :title="t('auth.modal_header_text_login')"
    :description="t('auth.modal_paragraph_text_login')"
    @close-modal="modalStore.closeLoginModal()"
  >
    <form class="lg:w-2/3 lg:mx-auto" @submit="login" novalidate>
      <BaseInput
        name="user"
        :title="t('auth.username_or_email')"
        :placeholder="t('auth.username_or_email')"
        input="text"
        id="login-user"
        :error="errors.user"
        :value="values.user"
      />
      <BaseInput
        name="password"
        :title="t('auth.password_input.label')"
        :placeholder="t('auth.confirm_password_input.placeholder')"
        input="password"
        id="login-password"
        :error="errors.password"
        :value="values.password"
      />
      <div class="flex justify-between">
        <div class="flex items-center gap-2">
          <Field :value="true" type="checkbox" name="remember_token" id="remember_token" />
          <label for="remember_token" class="text-white">{{ t('auth.remember_me') }}</label>
        </div>
        <button @click="openModal('password')" type="button" class="underline text-blue-main">
          {{ t('auth.forgot_password') }}
        </button>
      </div>
      <button
        class="flex justify-center gap-4 items-center mt-6 w-full bg-red-main border border-red-main text-white rounded-[4px] py-2 lg:enabled:hover:bg-white lg:enabled:hover:text-red-main lg:hover:duration-300 disabled:cursor-not-allowed"
        :disabled="isSubmitting"
      >
        <LoadingSpinnerMini v-if="isSubmitting" />
        {{ !isSubmitting ? t('auth.header_login_text') : t('loading') }}
      </button>
    </form>
    <button
      @click="googleSignupRedirect"
      class="flex items-center w-full border border-grey-secondary text-lg justify-center gap-4 text-white rounded-[4px] py-2 px-4 lg:hover:bg-white lg:hover:text-[#181623] lg:hover:duration-300 lg:w-2/3 lg:mx-auto group"
    >
      <GoogleIcon
        class="fill-grey-secondary sm:group-hover:fill-[#181623] sm:group-hover:duration-300"
      />
      {{ t('auth.google_login') }}
    </button>

    <p class="text-grey-main flex items-center gap-2 justify-center">
      {{ t('auth.dont_have_account') }}
      <span @click="openModal('signup')" class="text-blue-main underline lg:cursor-pointer">
        {{ t('auth.header_signup_text') }}
      </span>
    </p>
  </AuthModal>
</template>

<script setup lang="ts">
import GoogleIcon from '@/components/icons/GoogleIcon.vue'

import AuthModal from '@/ui/modals/AuthModal.vue'
import BaseInput from '@/components/BaseInput.vue'
import { Field, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'
import { useModalStore } from '@/stores/ModalStore'
import {
  login as loginApi,
  googleSignupRedirect as googleSignupRedirectApi,
  logout
} from '@/services/api/auth'
import type { Login } from '@/types'
import { useAuthStore } from '@/stores/AuthStore'
import { useRouter } from 'vue-router'

const { t } = useI18n()

const modalStore = useModalStore()
const authStore = useAuthStore()
const router = useRouter()

const schema = yup.object().shape({
  user: yup.string().required(t('auth.required_all')).min(3, t('validation.auth.username.min')),
  password: yup.string().trim().required(t('validation.auth.password.required'))
})

const { handleSubmit, errors, setFieldError, isSubmitting, values } = useForm<Login>({
  validationSchema: schema
})

function openModal(mode: string) {
  modalStore.closeLoginModal()
  mode === 'signup' ? modalStore.openSignupModal() : modalStore.openForgotPasswordModal()
}
const login = handleSubmit(async (values) => {
  try {
    await loginApi(values)
    modalStore.closeLoginModal()
    authStore.setUser(true)
    router.replace({ name: 'dashboard' })
  } catch (error: any) {
    if (error.response.status === 401) {
      logout()
    }
    if (error.response?.data?.errors) {
      for (const fieldName in error.response.data.errors) {
        setFieldError(fieldName as keyof Login, error.response.data.errors[fieldName])
      }
    }
  }
})

async function googleSignupRedirect() {
  const { data } = await googleSignupRedirectApi()
  if (data.url) {
    window.location.href = data.url
  }
}
</script>
