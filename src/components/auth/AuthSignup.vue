<template>
  <AuthModal
    :title="t('auth.modal_header_text_signup')"
    :description="t('auth.modal_paragraph_text_signup')"
    @close-modal="modalStore.closeSignupModal()"
  >
    <form class="lg:w-2/3 lg:mx-auto" @submit="signup" novalidate>
      <BaseInput
        name="username"
        :title="t('auth.username_input.label')"
        :placeholder="t('auth.username_input.placeholder')"
        input="text"
        id="signup-username"
        :error="errors.username"
      />
      <BaseInput
        name="email"
        :title="t('auth.email_input.label')"
        :placeholder="t('auth.email_input.placeholder')"
        input="email"
        id="signup-email"
        :error="errors.email"
      />
      <BaseInput
        name="password"
        :title="t('auth.password_input.label')"
        :placeholder="t('auth.password_input.placeholder')"
        input="password"
        id="signup-password"
        :error="errors.password"
      />
      <BaseInput
        name="password_confirmation"
        :title="t('auth.confirm_password_input.label')"
        :placeholder="t('auth.confirm_password_input.placeholder')"
        input="password"
        id="signup-confirm-password"
        :error="errors.password_confirmation"
      />
      <button
        class="flex justify-center gap-4 items-center mt-6 w-full bg-red-main border border-red-main text-white rounded-[4px] py-2 lg:enabled:hover:bg-white lg:enabled:hover:text-red-main lg:hover:duration-300 disabled:cursor-not-allowed"
        :disabled="isSubmitting"
      >
        <LoadingSpinnerMini v-if="isSubmitting" />
        {{ !isSubmitting ? t('auth.get_started_button') : t('loading') }}
      </button>
    </form>
    <button
      @click="googleSignupRedirect"
      class="flex items-center w-full border border-grey-secondary text-lg justify-center gap-4 text-white rounded-[4px] py-2 px-4 lg:hover:bg-white lg:hover:text-[#181623] lg:hover:duration-300 lg:w-2/3 lg:mx-auto group"
    >
      <GoogleIcon
        class="fill-grey-secondary sm:group-hover:fill-[#181623] sm:group-hover:duration-300"
      />
      {{ t('auth.google_signup') }}
    </button>
    <p class="text-grey-main flex items-center gap-2 justify-center">
      {{ t('auth.already_have_account') }}
      <span @click="openLoginModal" class="text-blue-main underline lg:cursor-pointer"
        >{{ t('auth.header_login_text') }}
      </span>
    </p>
  </AuthModal>
</template>

<script setup lang="ts">
import GoogleIcon from '@/components/icons/GoogleIcon.vue'

import AuthModal from '@/ui/modals/AuthModal.vue'
import BaseInput from '@/components/BaseInput.vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import {
  signup as signupApi,
  googleSignupRedirect as googleSignupRedirectApi,
  logout
} from '@/services/api/auth'
import { useI18n } from 'vue-i18n'
import { useModalStore } from '@/stores/ModalStore'
import type { Signup } from '@/types'

const { t } = useI18n()
const schema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required(t('validation.auth.username.required'))
    .min(3, t('validation.auth.username.min'))
    .max(15, t('validation.auth.username.max'))
    .matches(/^[a-z0-9]+$/, t('validation.auth.username.regex')),
  email: yup
    .string()
    .required(t('validation.auth.email.required'))
    .email(t('validation.auth.email.valid_email')),
  password: yup
    .string()
    .trim()
    .required(t('validation.auth.password.required'))
    .min(8, t('validation.auth.password.min'))
    .max(15, t('validation.auth.password.max'))
    .matches(/^[a-z0-9]+$/, t('validation.auth.password.regex')),
  password_confirmation: yup
    .string()
    .required(t('validation.auth.password_confirmation.required'))
    .oneOf([yup.ref('password')], t('validation.auth.password_confirmation.password_mismatch'))
})

const modalStore = useModalStore()

function openLoginModal() {
  modalStore.closeSignupModal()
  modalStore.openLoginModal()
}


const { handleSubmit, setFieldError, errors,isSubmitting } = useForm<Signup>({
  validationSchema: schema
})

const signup = handleSubmit(async (values) => {
  try {
    await signupApi(values)
    modalStore.setEmailUrl(values.email)
    modalStore.closeSignupModal()
    modalStore.openVerificationModal({
      headerText: t('modal.verification_sent_header_text'),
      paragraphText: t('modal.verification_sent_paragraph_text'),
      buttonText: t('modal.verification_sent_button_text'),
      icon: 'MailSentIcon',
      mode: 'sent'
    })
  } catch (error: any) {
    if (error.response.status === 401) {
      logout()
    }
    if (error.response?.data?.errors) {
      for (const fieldName in error.response.data.errors) {
        setFieldError(fieldName as keyof Signup, error.response.data.errors[fieldName])
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
