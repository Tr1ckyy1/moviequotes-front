<template>
  <RouterView />
  <ToastMessage />
</template>

<script setup lang="ts">
import ToastMessage from '@/ui/ToastMessage.vue'
import { useAuthStore } from './stores/AuthStore'
const authStore = useAuthStore()

if (localStorage.getItem('loggedIn')) authStore.setUser(true)
</script>
