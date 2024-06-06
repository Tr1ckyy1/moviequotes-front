<template>
  <li
    @click="markNotification"
    class="w-full border border-grey-main/50 rounded py-4 px-6 flex gap-4 hover:brightness-75 cursor-pointer duration-150"
  >
    <section class="flex flex-col items-center w-fit gap-1 shrink-0">
      <img
        v-if="notification.user_from.profile_image"
        :src="notification.user_from.profile_image"
        class="rounded-full object-over h-16 w-16 border-2"
        :class="!notification.read_at ? 'border-profile-green' : 'border-transparent'"
      />
      <img
        v-else
        src="@/assets/avatar-big.png"
        class="w-16 h-16 object-cover rounded-full border-2"
        :class="!notification.read_at ? 'border-profile-green' : 'border-transparent'"
      />
      <p v-if="!notification.read_at" class="text-profile-green lg:hidden">
        {{ t('notifications.new') }}
      </p>
    </section>
    <section class="space-y-2">
      <h2 class="text-xl">{{ notification.user_from.username }}</h2>
      <div class="flex gap-2 items-center">
        <QuotesIcon class="shrink-0" v-if="notification.type === 'comment'" />
        <HeartIcon class="shrink-0" v-if="notification.type === 'like'" />

        <p class="text-grey-secondary break-all">
          {{
            notification.type === 'comment'
              ? t('notifications.comment_message')
              : t('notifications.like_message')
          }}
        </p>
      </div>
      <p class="lg:hidden">{{ formattedRelativeDate }}</p>
    </section>
    <section class="hidden lg:block ml-auto">
      <p>{{ formattedRelativeDate }}</p>
      <p v-if="!notification.read_at" class="text-profile-green">{{ t('notifications.new') }}</p>
    </section>
  </li>
</template>

<script setup lang="ts">
import QuotesIcon from '@/components/icons/QuotesIcon.vue'
import HeartIcon from '@/components/icons/HeartIcon.vue'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { markAsRead } from '@/services/api/notifications'

import type { Notification } from '@/types'
import { useNotificationsStore } from '@/stores/NotificationsStore'
import { useQuotesStore } from '@/stores/QuotesStore'
import formatDate from '@/helpers/formatDate'

const props = defineProps<{
  notification: Notification
}>()
const emit = defineEmits<{
  (e: 'close-modal'): void
}>()

const { t } = useI18n()
const notificationsStore = useNotificationsStore()
const quotesStore = useQuotesStore()

function closeModal() {
  emit('close-modal')
}

async function markNotification() {
  if (!props.notification.read_at) {
    await markAsRead(props.notification.id)
    notificationsStore.getNotifications()
  }
  if (quotesStore.viewQuoteModal) await quotesStore.closeViewQuoteModal()

  closeModal()
  quotesStore.openViewQuoteModal(props.notification.quote_id)
}

const formattedRelativeDate = computed(() => formatDate(props.notification.created_at))
</script>
