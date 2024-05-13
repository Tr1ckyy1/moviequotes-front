import type { Toast } from '@/types'
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

  function setUserData(payload: UserData) {
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
