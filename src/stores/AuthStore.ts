import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useAuthStore = defineStore('AuthStore', () => {
  type UserData = {
    username: string
    email: string
    profileImage: string | null
    google: string | null
  }

  const userLoggedIn = ref(false)
  const userData = ref<UserData>({
    username: '',
    email: '',
    profileImage: null,
    google: null
  })
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

  function setUserData(payload: UserData) {
    userData.value = payload
  }

  return {
    userLoggedIn,
    setUser,
    setGoogleError,
    googleErrorToast,
    toastMessage,
    setUserData,
    userData
  }
})
