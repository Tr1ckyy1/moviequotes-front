import { defineStore } from 'pinia'
import { getNotifications as getNotificationsApi } from '@/services/api/notifications'
import type { Notification } from '@/types'
import { computed, ref } from 'vue'

export const useNotificationsStore = defineStore('NotificationsStore', () => {
  const notifications = ref<Notification[]>([])

  const newNotificationsLength = computed(
    () => notifications.value.filter((item) => !item.read_at).length
  )
  async function getNotifications() {
    const {
      data: { data }
    } = await getNotificationsApi()
    notifications.value = data
  }
  function updateNotifications(data: Notification) {
    notifications.value.unshift(data)
  }

  return { notifications, getNotifications, newNotificationsLength, updateNotifications }
})
