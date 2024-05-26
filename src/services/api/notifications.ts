import { instance } from '@/plugins/axios'

export async function getNotifications() {
  return await instance.get('/api/notifications')
}

export async function markAsRead(notificationId: number) {
  await instance.post(`/api/notifications/mark-as-read/${notificationId}`)
}

export async function markAllAsRead() {
  await instance.post('api/notifications/mark-all')
}
