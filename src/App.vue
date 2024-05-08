<template>
  <RouterView />
</template>

<script setup lang="ts">
import { getCsrfCookie } from './plugins/axios'
import { useAuthStore } from './stores/AuthStore'
const authStore = useAuthStore()
getCsrfCookie()

if (localStorage.getItem('loggedIn')) authStore.setUser(true)
</script>
