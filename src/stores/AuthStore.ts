import type { Toast, User } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useAuthStore = defineStore('AuthStore', () => {
  const userLoggedIn = ref(false)

  const userData = ref<User>({
    id: null,
    username: '',
    email: '',
    profile_image: undefined,
    google_id: null
  })

  const toast = ref<Toast>({
    open: false,
    text: '',
    mode: ''
  })

  function setToast(payload: Toast) {
    toast.value = payload
    setTimeout(() => {
      closeToast()
    }, 5000)
  }

  function closeToast() {
    toast.value = {
      open: false,
      text: '',
      mode: ''
    }
  }

  function setUser(payload: boolean) {
    userLoggedIn.value = payload
  }

  function setUserData(payload: User) {
    userData.value = payload
  }

  return {
    userLoggedIn,
    setUser,
    setUserData,
    userData,
    toast,
    setToast,
    closeToast
  }
})
