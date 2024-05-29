<template>
  <ViewQuoteModal v-if="quotesStore.viewQuoteModal.visible" />
  <EditQuoteModal v-if="quotesStore.editQuoteModal.visible" />

  <LoadingPage
    v-if="pageLoading"
    class="bg-gradient-to-r from-dark-main via-[#08080D] to-[#08080D] from-100% via-100% to-0%"
  />
  <header
    v-else
    class="bg-dark-third w-full border-b border-b-[#22203033] py-5 px-7 flex justify-between items-center lg:px-14 sticky top-0 z-50"
  >
    <div
      @click="navigate"
      class="hidden lg:block uppercase text-main font-semibold text-lg cursor-pointer"
    >
      movie quotes
    </div>
    <BurgerMenuIcon class="lg:hidden" @click="openSidebarModal" />
    <div class="flex gap-5 items-center lg:flex-row-reverse lg:gap-8">
      <button
        @click="logout"
        class="border border-white text-white py-2 px-4 rounded-[4px] hidden lg:block lg:hover:bg-white lg:hover:text-[#181624] lg:hover:duration-300"
      >
        {{ t('auth.logout_button') }}
      </button>
      <ControlLanguages />

      <SearchIcon
        class="lg:hidden"
        @click="openSearchModal"
        v-if="router.currentRoute.value.name === 'dashboard'"
      />
      <div
        class="relative"
        :class="
          notificationsModal &&
          'before:absolute before:top-10 lg:before:top-12 before:w-10 before:h-10 before:left-1/2 before:-translate-x-1/2 before:bg-black before:rotate-45'
        "
      >
        <div
          v-if="notificationsStore.unreadNotifications > 0"
          class="absolute flex p-1 items-center justify-center text-white bg-red-main w-6 h-6 rounded-full top-0 left-0 translate-x-1/2 -translate-y-1/2 text-xs"
        >
          {{ unreadNotifications }}
        </div>
        <NotificationIcon class="cursor-pointer" @click.stop="triggerNotificationsModal" />
        <NotificationsModal v-if="notificationsModal" @close-modal="closeNotificationsModal" />
      </div>
    </div>
  </header>

  <HeaderModal :modalOpen="sidebarModal" @close-modal="closeSidebarModal" mode="sidebar">
    <TheSidebar />
    <button @click="logout" class="border border-white py-2 px-4 rounded-[4px] w-fit block">
      {{ t('auth.logout_button') }}
    </button>
  </HeaderModal>

  <HeaderModal :modalOpen="searchModal" @close-modal="closeSearchModal">
    <header class="flex border-b border-grey-rare px-7 py-5 items-center gap-6">
      <ArrowLeft width="16" height="16" @click="closeSearchModal" />
      <input
        @keyup.enter="filterQuotes"
        ref="inputRef"
        type="text"
        class="outline-none bg-transparent placeholder:text-white w-full"
        :placeholder="t('dashboard.search_modal')"
      />
    </header>
    <main class="text-grey-secondary px-16 py-7 space-y-7">
      <p>{{ t('dashboard.search_at') }}</p>
      <p>{{ t('dashboard.search_hashtag') }}</p>
    </main>
  </HeaderModal>
</template>
<script setup lang="ts">
import BurgerMenuIcon from '@/components/icons/BurgerMenuIcon.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import NotificationIcon from '@/components/icons/NotificationIcon.vue'
import ArrowLeft from '@/components/icons/ArrowLeft.vue'
import ControlLanguages from '@/components/ControlLanguages.vue'
import HeaderModal from '@/components/dashboard/modals/HeaderModal.vue'
import TheSidebar from './TheSidebar.vue'
import { logout as logoutApi } from '@/services/api/auth'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { useMoviesStore } from '@/stores/MoviesStore'
import { getUser } from '@/services/api/user'
import { onMounted } from 'vue'
import { watchEffect } from 'vue'
import { onUpdated } from 'vue'
import NotificationsModal from '../ui/modals/NotificationsModal.vue'
import { echo } from '@/echo'
import { useNotificationsStore } from '@/stores/NotificationsStore'
import { onUnmounted } from 'vue'
import ViewQuoteModal from '@/components/movies-list/ViewQuoteModal.vue'
import { useQuotesStore } from '@/stores/QuotesStore'

import type { Notification } from '@/types'
import EditQuoteModal from '@/components/movies-list/EditQuoteModal.vue'

const sidebarModal = ref(false)
const searchModal = ref(false)
const pageLoading = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)
const notificationsModal = ref(false)

const { t } = useI18n()

const router = useRouter()
const authStore = useAuthStore()
const moviesStore = useMoviesStore()
const notificationsStore = useNotificationsStore()
const quotesStore = useQuotesStore()

const unreadNotifications = computed(() => notificationsStore.unreadNotifications)

async function logout() {
  await logoutApi()
  router.replace({ name: 'home' })
}

function navigate() {
  if (router.currentRoute.value.name !== 'dashboard') router.push({ name: 'dashboard' })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function triggerNotificationsModal() {
  notificationsModal.value = !notificationsModal.value
}
function closeNotificationsModal() {
  notificationsModal.value = false
}

function openSidebarModal() {
  sidebarModal.value = true
}

function closeSidebarModal() {
  sidebarModal.value = false
}

function openSearchModal() {
  searchModal.value = true
}

function closeSearchModal() {
  searchModal.value = false
}

function filterQuotes(e: KeyboardEvent) {
  const inputValue = e.target as HTMLInputElement
  let movieSearchTerm = ''
  let quoteSearchTerm = ''

  const atIndex = inputValue.value.indexOf('@')
  if (atIndex !== -1) {
    const nextDelimiterIndex = inputValue.value.indexOf('#', atIndex)
    if (nextDelimiterIndex !== -1) {
      movieSearchTerm = inputValue.value.substring(atIndex + 1, nextDelimiterIndex).trim()
    } else {
      movieSearchTerm = inputValue.value.substring(atIndex + 1).trim()
    }
  }

  const hashtagIndex = inputValue.value.indexOf('#')
  if (hashtagIndex !== -1) {
    const nextDelimiterIndex = inputValue.value.indexOf('@', hashtagIndex)
    if (nextDelimiterIndex !== -1) {
      quoteSearchTerm = inputValue.value.substring(hashtagIndex + 1, nextDelimiterIndex).trim()
    } else {
      quoteSearchTerm = inputValue.value.substring(hashtagIndex + 1).trim()
    }
  }
  router.push({
    query: {
      'movie.name': movieSearchTerm ?? null,
      quote: quoteSearchTerm ?? null
    }
  })
  closeSearchModal()
}

async function user() {
  try {
    pageLoading.value = true
    const {
      data: { data }
    } = await getUser()
    authStore.setUserData({
      id: data.id,
      username: data.username,
      email: data.email,
      profile_image: data.profile_image,
      google_id: data.google_id
    })
  } catch (err: any) {
    if (err.response?.status === 401) {
      logoutApi()
      authStore.setToast({
        open: true,
        text: t('auth.session_expired'),
        mode: 'error'
      })
    }
  } finally {
    pageLoading.value = false
  }
}

function handleNotifications(data: { notification: Notification }) {
  notificationsStore.updateNotifications(data.notification)
}

onUpdated(() => {
  if (inputRef.value) inputRef.value.focus()
})

onBeforeRouteUpdate(() => {
  if (sidebarModal.value) closeSidebarModal()
})

onMounted(async () => {
  await user()
  await moviesStore.getCategories()
  await moviesStore.getMovies()
  await notificationsStore.getNotifications()

  watchEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        if (sidebarModal.value) closeSidebarModal()
        if (searchModal.value) closeSearchModal()
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })
  if (authStore.userData.id) {
    echo
      .channel(`notifications.${authStore.userData.id}`)
      .listen('QuoteLikeNotification', handleNotifications)
    echo
      .channel(`notifications.${authStore.userData.id}`)
      .listen('QuoteCommentNotification', handleNotifications)
  }
})

onUnmounted(() => {
  if (authStore.userData.id) {
    echo
      .channel(`notifications.${authStore.userData.id}`)
      .stopListening('QuoteLikeNotification', handleNotifications)
    echo
      .channel(`notifications.${authStore.userData.id}`)
      .stopListening('QuoteCommentNotification', handleNotifications)
  }
})
</script>
