import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useModalStore = defineStore('ModalStore', () => {
  const signupModalOpen = ref(false)
  const loginModalOpen = ref(false)
  const forgotPasswordModalOpen = ref(false)
  const resetPasswordModalOpen = ref(false)
  const verificationSentModal = ref(false)
  const emailUrl = ref('')

  const verificationModalInfo = ref<VerificationModal>({
    headerText: '',
    paragraphText: '',
    buttonText: '',
    icon: '',
    mode: ''
  })

  type VerificationModal = {
    headerText: string
    paragraphText: string
    buttonText: string
    icon: Icon
    mode: string
  }
  type Icon = 'MailSentIcon' | 'ExpiredIcon' | 'VerifiedIcon' | ''

  function openVerificationModal(payload: VerificationModal) {
    verificationModalInfo.value = payload
    verificationSentModal.value = true
  }

  function closeVerificationModal() {
    verificationSentModal.value = false
    verificationModalInfo.value = {
      headerText: '',
      paragraphText: '',
      buttonText: '',
      icon: '',
      mode: ''
    }
  }

  function openSignupModal() {
    signupModalOpen.value = true
  }
  function closeSignupModal() {
    signupModalOpen.value = false
  }

  function openLoginModal() {
    loginModalOpen.value = true
  }

  function closeLoginModal() {
    loginModalOpen.value = false
  }

  function openForgotPasswordModal() {
    forgotPasswordModalOpen.value = true
  }
  function closeForgotPasswordModal() {
    forgotPasswordModalOpen.value = false
  }
  function openResetPasswordModal() {
    resetPasswordModalOpen.value = true
  }
  function closeResetPasswordModal() {
    resetPasswordModalOpen.value = false
  }

  function setEmailUrl(value: string) {
    emailUrl.value = value
  }

  return {
    signupModalOpen,
    loginModalOpen,
    verificationSentModal,
    openVerificationModal,
    closeVerificationModal,
    openSignupModal,
    closeSignupModal,
    openLoginModal,
    closeLoginModal,
    verificationModalInfo,
    emailUrl,
    setEmailUrl,
    forgotPasswordModalOpen,
    openForgotPasswordModal,
    closeForgotPasswordModal,
    resetPasswordModalOpen,
    openResetPasswordModal,
    closeResetPasswordModal
  }
})
