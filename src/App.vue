<template>
  <RouterView name="header" />

  <RouterView />
</template>

<script setup lang="ts">
import { getCsrfCookie } from './plugins/axios'
import { useAuthStore } from './stores/AuthStore'
const { setUser } = useAuthStore()
getCsrfCookie()

if (localStorage.getItem('loggedIn')) setUser(true)
</script>
