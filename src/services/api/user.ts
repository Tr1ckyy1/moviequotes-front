import { instance } from '@/plugins/axios'
export async function getUser() {
  return await instance.get('/api/user')
}
