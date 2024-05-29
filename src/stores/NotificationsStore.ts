import { defineStore } from 'pinia'
import { getNotifications as getNotificationsApi } from '@/services/api/notifications'
import type { Notification } from '@/types'
import { ref } from 'vue'

export const useNotificationsStore = defineStore('NotificationsStore', () => {
  const notifications = ref<Notification[]>([])
  const page = ref(1)
  const totalPages = ref(0)
  const unreadNotifications = ref(0)

  async function getNotifications() {
    const { data } = await getNotificationsApi(page.value)
    notifications.value = data.data
    unreadNotifications.value = data.unread_total
    totalPages.value = data.meta.last_page
  }

  function updateNotifications(data: Notification) {
    notifications.value.unshift(data)
    unreadNotifications.value++
  }

  async function loadMore() {
    if (page.value < totalPages.value) {
      page.value++
      const { data } = await getNotificationsApi(page.value)
      if (page.value <= data.meta.last_page) {
        notifications.value.push(...data.data)
      }
    }
  }

  return {
    notifications,
    getNotifications,
    unreadNotifications,
    updateNotifications,
    loadMore
  }
})
