<template>
  <div
    class="rounded-xl fixed h-screen top-16 lg:top-[90px] right-0 lg:right-14 w-full lg:w-1/2 lg:h-3/4 lg:max-h-[52rem] scrollbar overflow-y-auto bg-black text-white px-6 py-8"
    ref="container"
  >
    <div v-if="notificationsStore.notifications.length > 0">
      <header class="flex items-center justify-between gap-2">
        <h1 class="text-xl lg:text-3xl font-medium">{{ t('notifications.notifications') }}</h1>
        <button @click="markAllNotifications" class="text-sm lg:text-xl border-b">
          {{ t('notifications.mark_all') }}
        </button>
      </header>
      <main class="mt-6">
        <ul class="space-y-2">
          <NotificationItem
            v-for="notification in notificationsStore.notifications"
            :key="notification.id"
            :notification="notification"
            @close-modal="closeModal"
          />
        </ul>
      </main>
    </div>
    <p class="text-2xl lg:text-4xl" v-else>{{ t('notifications.no_notifications') }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { onBeforeUnmount } from 'vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import NotificationItem from '@/components/NotificationItem.vue'
import { useNotificationsStore } from '@/stores/NotificationsStore'
import { markAllAsRead } from '@/services/api/notifications'

const emit = defineEmits<{
  (e: 'close-modal'): void
}>()

const { t } = useI18n()

const container = ref<HTMLDivElement | null>(null)
const notificationsStore = useNotificationsStore()

function closeModal() {
  emit('close-modal')
}

async function markAllNotifications() {
  await markAllAsRead()
  notificationsStore.getNotifications()
}

function handleClickOutside(e: Event) {
  if (container.value && !container.value.contains(e.target as Node)) {
    closeModal()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
