<template>
  <RouterView />
  <ToastMessage />
</template>

<script setup lang="ts">
import ToastMessage from '@/ui/ToastMessage.vue'
import { useAuthStore } from './stores/AuthStore'
import { getCsrfCookie } from './plugins/axios'
const authStore = useAuthStore()

getCsrfCookie()
if (localStorage.getItem('loggedIn')) authStore.setUser(true)
</script>
