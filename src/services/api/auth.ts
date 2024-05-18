import { instance } from '@/plugins/axios'
import { useAuthStore } from '@/stores/AuthStore'
import type { Signup, Queries, Login, ResetPassword, TokenValidity } from '@/types'
import router from '@/router'
export async function signup(data: Signup) {
  await instance.post('/api/signup', data)
}

export async function googleSignupRedirect() {
  return await instance.get('/api/auth/google/redirect')
}

export async function googleSignupCallback(code: Object) {
  await instance.get('/api/auth/google/callback', { params: code })
}

export async function login(data: Login) {
  await instance.post('/api/login', data)
  if (!localStorage.getItem('loggedIn')) localStorage.setItem('loggedIn', 'true')
}

export async function logout() {
  const authStore = useAuthStore()
  await instance.post('/api/logout')
  if (localStorage.getItem('loggedIn')) localStorage.removeItem('loggedIn')
  router.replace({ name: 'home' })
  authStore.setUser(false)
  authStore.setUserData({
    username: '',
    email: '',
    profile_image: undefined,
    google_id: null
  })
}

export async function verifyUser({ id, hash, expires, signature }: Queries) {
  await instance.get(`/api/email/verify/${id}/${hash}?expires=${expires}&signature=${signature}`)
}

export async function resend({ id, expires }: Queries) {
  await instance.post('/api/email/verification-notification', { id, expires })
}

export async function forgotPassword(emailAddress: string) {
  await instance.post('api/forgot-password', { email: emailAddress })
}

export async function resetPassword(data: ResetPassword) {
  await instance.post('/api/reset-password', data)
}

export async function checkTokenValidity({ email, token }: TokenValidity) {
  await instance.post('/api/check-token-validity', { email, token })
}
