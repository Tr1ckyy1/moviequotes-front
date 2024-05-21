<template>
  <LoadingPage
    v-if="pageLoading || moviesStore.pageLoading"
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

      <NotificationIcon />
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
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { useMoviesStore } from '@/stores/MoviesStore'
import { getUser } from '@/services/api/user'
import { onMounted } from 'vue'
import { watchEffect } from 'vue'
import { onUpdated } from 'vue'
import { watch } from 'vue'

const sidebarModal = ref(false)
const searchModal = ref(false)
const pageLoading = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

const { t } = useI18n()

const route = useRoute()
const router = useRouter()
const { setToast, setUserData } = useAuthStore()
const moviesStore = useMoviesStore()

async function logout() {
  await logoutApi()
}

function navigate() {
  if (router.currentRoute.value.name !== 'dashboard') router.push({ name: 'dashboard' })
  window.scrollTo({ top: 0, behavior: 'smooth' })
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
      movie: movieSearchTerm ?? null,
      quote: quoteSearchTerm ?? null
    }
  })
}

watch(route, (val) => {
  console.log(val.query)
})

async function user() {
  try {
    pageLoading.value = true
    const {
      data: { data }
    } = await getUser()
    setUserData({
      id: data.id,
      username: data.username,
      email: data.email,
      profile_image: data.profile_image,
      google_id: data.google_id
    })
  } catch (err: any) {
    if (err.response?.status === 401) {
      logoutApi()
      setToast({
        open: true,
        text: t('auth.session_expired'),
        mode: 'error'
      })
    }
  } finally {
    pageLoading.value = false
  }
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
})
</script>
