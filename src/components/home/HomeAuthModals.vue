<template>
  <LoadingPage v-if="pageLoading" />
  <div class="flex items-center gap-4">
    <button
      @click="modalStore.openSignupModal"
      class="text-white border border-red-main bg-red-main py-1.5 px-3 rounded-[4px] whitespace-nowrap lg:hover:bg-white lg:hover:text-red-main lg:hover:duration-300"
    >
      {{ $t('auth.header_signup_text') }}
    </button>
    <button
      @click="modalStore.openLoginModal"
      class="text-white border border-white py-1.5 px-3 rounded-[4px] whitespace-nowrap lg:hover:bg-white lg:hover:text-black lg:duration-300"
    >
      {{ $t('auth.header_login_text') }}
    </button>

    <ModalItem @close-modal="modalStore.closeSignupModal" :modalIsOpen="modalStore.signupModalOpen">
      <AuthSignup />
    </ModalItem>

    <ModalItem @close-modal="modalStore.closeLoginModal" :modalIsOpen="modalStore.loginModalOpen">
      <AuthLogin />
    </ModalItem>

    <ModalItem
      @close-modal="modalStore.closeForgotPasswordModal"
      :modalIsOpen="modalStore.forgotPasswordModalOpen"
    >
      <AuthForgotPassword />
    </ModalItem>

    <ModalItem
      @close-modal="modalStore.closeResetPasswordModal"
      :modalIsOpen="modalStore.resetPasswordModalOpen"
    >
      <AuthResetPassword />
    </ModalItem>

    <ModalItem
      @close-modal="modalStore.closeVerificationModal"
      :modalIsOpen="modalStore.verificationSentModal"
    >
      <MessageModal />
    </ModalItem>
  </div>
</template>

<script setup lang="ts">
import AuthSignup from '@/components/auth/AuthSignup.vue'
import AuthLogin from '@/components/auth/AuthLogin.vue'
import AuthForgotPassword from '@/components/auth/AuthForgotPassword.vue'
import AuthResetPassword from '../auth/AuthResetPassword.vue'
import { useModalStore } from '@/stores/ModalStore'
import { useRoute } from 'vue-router'
import { checkTokenValidity, verifyUser } from '@/services/api/auth'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const modalStore = useModalStore()
const { t } = useI18n()

const {
  query: { id, hash, expires, signature, token, email }
} = useRoute()

const pageLoading = ref(false)

async function sendVerificationRequest() {
  if (id && hash && expires && signature) {
    try {
      pageLoading.value = true
      await verifyUser({
        id: id.toString(),
        hash: hash.toString(),
        expires: expires.toString(),
        signature: signature.toString()
      })

      modalStore.openVerificationModal({
        headerText: t('modal.verification_sent_header_text'),
        paragraphText: t('modal.verified_paragraph_text'),
        buttonText: t('auth.header_login_text'),
        icon: 'VerifiedIcon',
        mode: 'verified'
      })
    } catch (err: any) {
      if (err.response.status === 403) {
        if (err.response.data?.already_verified) {
          modalStore.openVerificationModal({
            buttonText: t('auth.header_login_text'),
            headerText: t('modal.verified_already_header_text'),
            paragraphText: t('modal.verified_already_paragraph_text'),
            icon: 'ExpiredIcon',
            mode: 'verified'
          })
        }
        if (err.response?.data?.expired) {
          modalStore.openVerificationModal({
            headerText: t('modal.expired_header_text'),
            paragraphText: t('modal.expired_paragraph_text_verification'),
            buttonText: t('modal.expired_button_text'),
            icon: 'ExpiredIcon',
            mode: 'expired_verification'
          })
        }
      }
    } finally {
      pageLoading.value = false
    }
  }
  if (token && email) {
    try {
      pageLoading.value = true
      await checkTokenValidity({ token: token.toString(), email: email.toString() })
      modalStore.openResetPasswordModal()
    } catch (err: any) {
      if (err.response?.status === 403 && err.response?.data?.expired) {
        modalStore.openVerificationModal({
          headerText: t('modal.expired_header_text'),
          paragraphText: t('modal.expired_paragraph_text_reset'),
          buttonText: t('modal.expired_button_text'),
          icon: 'ExpiredIcon',
          mode: 'expired_reset'
        })
      }
    } finally {
      pageLoading.value = false
    }
  }
}
sendVerificationRequest()
</script>
