<template>
  <h1 class="text-5xl text-red-500">Hello world</h1>
  <button @click="logout" class="border bg-black text-white">Logout</button>
</template>

<script setup lang="ts">
import { logout as logoutApi } from '@/services/api/auth'
import { getUser } from '@/services/api/user'
import { useRouter } from 'vue-router'

const router = useRouter()
async function logout() {
  await logoutApi()
  router.replace({ name: 'home' })
}
async function user() {
  try {
    const data = await getUser()
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}
user()
</script>
