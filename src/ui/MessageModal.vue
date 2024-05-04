<template>
  <div
    class="text-white flex flex-col items-center justify-center gap-8 text-center bg-modal-bg w-[90%] max-w-lg py-10 px-14"
  >
    <component :is="iconComponents[modalStore.verificationModalInfo.icon]"></component>
    <h1 class="text-3xl">{{ modalStore.verificationModalInfo.headerText }}</h1>
    <p>
      {{ modalStore.verificationModalInfo.paragraphText }}
    </p>
    <button
      @click="buttonAction"
      class="flex justify-center gap-4 items-center w-full bg-red-main border border-red-main rounded-[4px] py-2 px-10 lg:enabled:hover:bg-white lg:enabled:hover:text-red-main lg:enabled:hover:duration-300 disabled:cursor-not-allowed"
      :disabled="buttonLoading"
    >
      <LoadingSpinnerMini class="text-white fill-red-main" v-if="buttonLoading" />

      {{ buttonLoading ? t('loading') : modalStore.verificationModalInfo.buttonText }}
    </button>

    <p
      @click="modalStore.closeVerificationModal"
      v-if="
        modalStore.verificationModalInfo.paragraphText ===
        t('auth.modal_forgot_password.request_sent_paragraph')
      "
      class="text-[#6C757D] cursor-pointer"
    >
      {{ t('auth.modal_forgot_password.request_sent_skip') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import MailSentIcon from '@/components/icons/MailSentIcon.vue'
import ExpiredIcon from '@/components/icons/ExpiredIcon.vue'
import VerifiedIcon from '@/components/icons/VerifiedIcon.vue'
import { useModalStore } from '@/stores/ModalStore'
import { useRoute } from 'vue-router'
import { resend } from '@/services/api/auth'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const iconComponents: any = {
  MailSentIcon,
  ExpiredIcon,
  VerifiedIcon
}

const modalStore = useModalStore()

const {
  query: { id, expires, email }
} = useRoute()

const buttonLoading = ref(false)

async function resendVerification() {
  if (id && expires) {
    try {
      buttonLoading.value = true
      await resend({ id: id.toString(), expires: expires.toString() })
      if (typeof email === 'string') {
        modalStore.setEmailUrl(email)
      }
      modalStore.openVerificationModal({
        headerText: t('modal.verification_sent_header_text'),
        paragraphText: t('modal.verification_sent_paragraph_text'),
        buttonText: t('modal.verification_sent_button_text'),
        icon: 'MailSentIcon',
        mode: 'sent'
      })
    } catch (err: any) {
      if (err.response.status === 500) {
        modalStore.closeVerificationModal()
      }
      if (err.response.status === 403 && err.response.data?.already_verified) {
        modalStore.openVerificationModal({
          buttonText: t('auth.header_login_text'),
          headerText: t('modal.verified_already_header_text'),
          paragraphText: t('modal.verified_already_paragraph_text'),
          icon: 'ExpiredIcon',
          mode: 'verified'
        })
      }
    } finally {
      buttonLoading.value = false
    }
  }
}

function buttonAction() {
  const { mode } = modalStore.verificationModalInfo
  if (mode === 'sent') {
    const url = modalStore.emailUrl.split('@'[1])
    window.open(`https://${url}`, '_blank')
    modalStore.closeVerificationModal()
  }
  if (mode === 'verified') {
    modalStore.closeVerificationModal()
    modalStore.openLoginModal()
  }
  if (mode === 'expired_verification') {
    resendVerification()
  }
  if (mode === 'expired_reset') {
    modalStore.closeVerificationModal()
    modalStore.openForgotPasswordModal()
  }
}
</script>
