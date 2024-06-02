<template>
  <AuthModal
    :title="t('auth.modal_reset_password.header_text')"
    :description="t('auth.modal_reset_password.paragraph_text')"
    @close-modal="modalStore.closeResetPasswordModal()"
  >
    <form class="lg:w-2/3 lg:mx-auto" @submit="resetPassword" novalidate>
      <BaseInput
        name="password"
        :title="t('auth.password_input.label')"
        :placeholder="t('auth.password_input.placeholder')"
        input="password"
        id="signup-password"
        :error="errors.password"
        :value="values.password"
      />
      <BaseInput
        name="password_confirmation"
        :title="t('auth.confirm_password_input.label')"
        :placeholder="t('auth.confirm_password_input.placeholder')"
        input="password"
        id="signup-confirm-password"
        :error="errors.password_confirmation"
        :value="values.password_confirmation"
      />

      <button
        class="flex justify-center gap-4 items-center mt-6 w-full bg-red-main border border-red-main text-white rounded-[4px] py-2 lg:enabled:hover:bg-white lg:enabled:hover:text-red-main lg:hover:duration-300 disabled:cursor-not-allowed"
        :disabled="isSubmitting"
      >
        <LoadingSpinnerMini v-if="isSubmitting" />
        {{ !isSubmitting ? t('auth.modal_reset_password.button_text') : t('loading') }}
      </button>
    </form>

    <button
      @click="backToLogin"
      class="cursor-pointer text-grey-main flex items-center gap-2 mx-auto"
    >
      <ArrowLeft />
      {{ t('auth.modal_forgot_password.back') }}
    </button>
  </AuthModal>
</template>

<script setup lang="ts">
import AuthModal from '@/ui/modals/AuthModal.vue'
import BaseInput from '@/components/BaseInput.vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'
import { useModalStore } from '@/stores/ModalStore'
import { resetPassword as resetPasswordApi } from '@/services/api/auth'
import ArrowLeft from '@/components/icons/ArrowLeft.vue'
import { useRoute } from 'vue-router'
import type { ResetPassword } from '@/types'

const modalStore = useModalStore()
const { t } = useI18n()

const {
  query: { token, email }
} = useRoute()

const schema = yup.object().shape({
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

const { handleSubmit, errors, setFieldError, isSubmitting, values } = useForm<ResetPassword>({
  validationSchema: schema
})

function backToLogin() {
  modalStore.closeResetPasswordModal()
  modalStore.openLoginModal()
}

const resetPassword = handleSubmit(async (values) => {
  try {
    if (typeof token === 'string' && typeof email === 'string')
      await resetPasswordApi({ ...values, token, email })
    modalStore.closeResetPasswordModal()
    modalStore.openVerificationModal({
      headerText: t('auth.modal_reset_password.request_sent_header'),
      paragraphText: t('auth.modal_reset_password.request_sent_paragraph'),
      buttonText: t('auth.header_login_text'),
      icon: 'VerifiedIcon',
      mode: 'verified'
    })
  } catch (error: any) {
    if (error.response?.status === 400 && error.response?.data?.expired) {
      modalStore.closeResetPasswordModal()
      modalStore.openVerificationModal({
        headerText: t('modal.expired_header_text'),
        paragraphText: t('modal.expired_paragraph_text_reset'),
        buttonText: t('modal.expired_button_text'),
        icon: 'ExpiredIcon',
        mode: 'expired_reset'
      })
    }
    if (error.response?.data?.errors) {
      for (const fieldName in error.response.data.errors) {
        setFieldError(fieldName as keyof ResetPassword, error.response.data.errors[fieldName])
      }
    }
  }
})
</script>
