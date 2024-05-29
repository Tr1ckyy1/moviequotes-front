import { instance } from '@/plugins/axios'

export async function getNotifications(page: number) {
  return await instance.get('/api/notifications', { params: { page } })
}

export async function markAsRead(notificationId: number) {
  await instance.post(`/api/notifications/mark-as-read/${notificationId}`)
}

export async function markAllAsRead() {
  await instance.post('api/notifications/mark-all')
}
