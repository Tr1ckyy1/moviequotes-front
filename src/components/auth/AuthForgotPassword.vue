<template>
  <AuthModal
    :title="t('auth.modal_forgot_password.header_text')"
    :description="t('auth.modal_forgot_password.paragraph_text')"
    @close-modal="modalStore.closeForgotPasswordModal()"
  >
    <form class="lg:w-2/3 lg:mx-auto" @submit="forgotPassword" novalidate>
      <BaseInput
        name="email"
        :title="t('auth.email_input.label')"
        :placeholder="t('auth.email_input.placeholder')"
        input="email"
        id="forgot-password-email"
        :error="errors.email"
      />

      <button
        class="flex justify-center gap-4 items-center mt-6 w-full bg-red-main border border-red-main text-white rounded-[4px] py-2 lg:enabled:hover:bg-white lg:enabled:hover:text-red-main lg:hover:duration-300 disabled:cursor-not-allowed"
        :disabled="formLoading"
      >
        <LoadingSpinnerMini class="text-white fill-red-main" v-if="formLoading" />
        {{ !formLoading ? t('auth.modal_forgot_password.button_text') : t('loading') }}
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
import { forgotPassword as forgotPasswordApi, logout } from '@/services/api/auth'
import { ref } from 'vue'
import ArrowLeft from '@/components/icons/ArrowLeft.vue'

const { t } = useI18n()

const modalStore = useModalStore()

const formLoading = ref(false)

const schema = yup.object().shape({
  email: yup
    .string()
    .required(t('validation.auth.email.required'))
    .email(t('validation.auth.email.valid_email'))
})

const { handleSubmit, errors, setFieldError } = useForm({ validationSchema: schema })

function backToLogin() {
  modalStore.closeForgotPasswordModal()
  modalStore.openLoginModal()
}

const forgotPassword = handleSubmit(async (values) => {
  try {
    formLoading.value = true
    await forgotPasswordApi(values.email)
    modalStore.setEmailUrl(values.email)
    modalStore.closeForgotPasswordModal()
    modalStore.openVerificationModal({
      headerText: t('auth.modal_forgot_password.request_sent_header'),
      paragraphText: t('auth.modal_forgot_password.request_sent_paragraph'),
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
        setFieldError(fieldName, error.response.data.errors[fieldName])
      }
    }
  } finally {
    formLoading.value = false
  }
})
</script>
