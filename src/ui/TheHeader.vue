<template>
  <BurgerMenuModal
    @close-modal="closeSidebarModal"
    :modalOpen="sidebarModal"
    @logout="logout"
    :logoutText="t('auth.logout_button')"
  />
  <SearchModal
    :modalOpen="searchModal"
    @close-modal="closeSearchModal"
    :searchText="t('dashboard.search_modal')"
    :searchAt="t('dashboard.search_at')"
    :searchHashtag="t('dashboard.search_hashtag')"
  />
  <LoadingPage v-if="pageLoading" />

  <header
    v-else
    class="bg-[#24222F] w-full border-b border-b-[#22203033] py-5 px-7 flex justify-between items-center lg:px-14 sticky top-0"
  >
    <RouterLink
      @click="scrollToTop"
      :to="{ name: 'dashboard' }"
      class="hidden lg:block uppercase text-main font-semibold text-lg"
      >movie quotes</RouterLink
    >
    <BurgerMenuIcon class="lg:hidden" @click="openSidebarModal" />
    <div class="flex gap-5 items-center lg:flex-row-reverse lg:gap-8">
      <button
        @click="logout"
        class="border border-white text-white py-2 px-4 rounded-[4px] hidden lg:block lg:hover:bg-white lg:hover:text-[#181624] lg:hover:duration-300"
      >
        {{ t('auth.logout_button') }}
      </button>
      <ControlLanguages />

      <SearchIcon class="lg:hidden" @click="openSearchModal" />

      <NotificationIcon />
    </div>
  </header>
</template>
<script setup lang="ts">
import BurgerMenuIcon from '@/components/icons/BurgerMenuIcon.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import NotificationIcon from '@/components/icons/NotificationIcon.vue'
import ControlLanguages from '@/components/ControlLanguages.vue'
import BurgerMenuModal from './modals/BurgerMenuModal.vue'
import SearchModal from './modals/SearchModal.vue'
import { logout as logoutApi } from '@/services/api/auth'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { getUser } from '@/services/api/user'

const sidebarModal = ref(false)
const searchModal = ref(false)

const { t } = useI18n()

const router = useRouter()

const authStore = useAuthStore()

const pageLoading = ref(false)

async function user() {
  try {
    pageLoading.value = true
    const { data } = await getUser()
    authStore.setUserData({
      username: data.username,
      profileImage: data.profile_image
    })
  } catch (err: any) {
    if (err.response?.status === 401) logoutApi()
  } finally {
    pageLoading.value = false
  }
}

user()

async function logout() {
  await logoutApi()
  router.replace({ name: 'home' })
}

function scrollToTop() {
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
</script>
