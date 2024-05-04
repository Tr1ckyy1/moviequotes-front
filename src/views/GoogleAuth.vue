<template>
  <div
    class="bg-gradient-to-r from-[#11101A] via-[#08080D] to-[#08080D] from-100% via-100% to-0% w-full h-screen"
  >
    <LoadingPage />
  </div>
</template>

<script setup lang="ts">
import { googleSignupCallback as googleSignupCallbackApi } from '@/services/api/auth'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'

const {
  query: { code }
} = useRoute()

const { setUser, setGoogleError } = useAuthStore()

const router = useRouter()
async function googleSignupCallback() {
  if (code) {
    try {
      await googleSignupCallbackApi({ code: code.toString() })
      setUser(true)
      if (!localStorage.getItem('loggedIn')) localStorage.setItem('loggedIn', 'true')
      router.replace({ name: 'dashboard' })
    } catch (err: any) {
      if (err.response?.data?.error) {
        setGoogleError(err.response?.data?.error)
      }
      router.replace({ name: 'home' })
    }
  } else {
    router.replace({ name: 'home' })
  }
}

googleSignupCallback()
</script>
