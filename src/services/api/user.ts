import { instance } from '@/plugins/axios'
import type { UserData } from '@/types'

export async function getUser() {
  return await instance.get('/api/user')
}

export async function updateUserProfile(data: UserData) {
  const formData = new FormData()
  for (const key of Object.keys(data)) {
    const value = data[key as keyof UserData]
    if (value) {
      formData.append(key, value)
    }
  }
  return await instance.post('/api/update-profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params: {
      _method: 'PATCH'
    }
  })
}
