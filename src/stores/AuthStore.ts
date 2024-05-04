import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useAuthStore = defineStore('AuthStore', () => {
  const userLoggedIn = ref(false)
  const googleErrorToast = ref(false)
  const toastMessage = ref('')

  function setGoogleError(payload: string) {
    googleErrorToast.value = true
    toastMessage.value = payload
    setTimeout(() => {
      googleErrorToast.value = false
      toastMessage.value = ''
    }, 5000)
  }

  function setUser(payload: boolean) {
    userLoggedIn.value = payload
  }

  return { userLoggedIn, setUser, setGoogleError, googleErrorToast, toastMessage }
})
