<template>
  <MainModal :modalOpen="quotesStore.viewQuoteModal.visible" @close-modal="closeModal">
    <div
      class="bg-[#0D0B14] h-full lg:max-h-[50rem] overflow-y-auto scrollbar-none lg:ml-[calc(25%_+80px)] xl:ml-[calc(25%_+16px)] lg:rounded-xl lg:w-[55%]"
    >
      <header class="flex items-center justify-between p-7 border-b border-[#EFEFEF33]">
        <div class="rounded-llg flex items-center justify-center gap-6">
          <EditIcon @click="openEditModal" class="lg:hover:brightness-75 cursor-pointer" />
          <span class="bg-grey-main w-[1px] h-5"></span>
          <TrashIcon @click="deleteQuote" class="lg:hover:brightness-75 cursor-pointer" />
        </div>
        <h1 class="hidden lg:block capitalize font-semibold text-xl">
          {{ t('show.view_quote') }}
        </h1>
        <XIcon @click="closeModal" class="lg:cursor-pointer" />
      </header>
      <LoadingPageMini v-if="loading" />

      <main v-else-if="!loading && quoteData" class="p-7 space-y-6">
        <section class="flex items-center gap-5">
          <div class="w-10 h-10 lg:h-14 lg:w-14 shrink-0 rounded-full">
            <img
              v-if="quoteData.user.profile_image"
              :src="quoteData.user.profile_image"
              class="w-full h-full rounded-full object-cover"
            />
            <img v-else src="@/assets/avatar.png" class="w-full h-full rounded-full object-cover" />
          </div>
          <h2 class="break-all">
            {{ quoteData.user.username }}
          </h2>
        </section>
        <div
          class="flex gap-2 overflow-y-scroll scrollbar justify-between rounded border border-grey-main/70 px-4 py-3"
        >
          <p class="break-all">{{ quoteData.quote.en }}</p>
          <span class="text-grey-main">Eng</span>
        </div>
        <div
          class="flex gap-2 overflow-y-scroll scrollbar justify-between rounded border border-grey-main/70 px-4 py-3"
        >
          <p class="break-all">{{ quoteData.quote.ka }}</p>
          <span class="text-grey-main">ქარ</span>
        </div>
        <img class="h-80 lg:h-[32rem] w-full object-cover rounded-llg" :src="quoteData.image" />
        <div class="flex items-center gap-6">
          <div class="flex gap-4 items-center">
            <span class="text-xl">{{ quoteData.comments.length }}</span>
            <CommentsIcon class="cursor-pointer lg:hover:brightness-75" />
          </div>
          <div class="flex gap-4 items-center">
            <span class="text-xl"> {{ quoteData.likes.length }} </span>

            <LikesIcon
              :fill="userHasLiked && '#E31221'"
              @click="updateLike"
              class="cursor-pointer lg:hover:brightness-75"
            />
          </div>
        </div>
        <ul class="overflow-y-auto scrollbar space-y-4 max-h-60">
          <CommentItem v-for="comment in quoteData.comments" :key="comment.id" :comment="comment" />
        </ul>
        <div class="flex gap-4 h-fit">
          <div class="w-10 h-10 lg:w-[52px] lg:h-[52px] shrink-0">
            <img
              v-if="userData?.profile_image"
              :src="userData?.profile_image"
              class="object-cover rounded-full h-full w-full"
            />
            <img v-else src="@/assets/avatar.png" class="object-cover h-full w-full" />
          </div>
          <input
            v-model="commentInput"
            @keyup.enter="addComment"
            type="text"
            class="w-full bg-dark-third rounded-llg outline-none px-4 text-grey-secondary placeholder:text-grey-secondary"
            :placeholder="t('dashboard.write_comment')"
          />
        </div>
      </main>
    </div>
  </MainModal>
</template>

<script setup lang="ts">
import XIcon from '@/components/icons/XIcon.vue'
import MainModal from '@/components/dashboard/modals/MainModal.vue'
import { useI18n } from 'vue-i18n'
import {
  getQuote as getQuoteApi,
  updateLike as updateLikeApi,
  addComment as addCommentApi,
  deleteQuote as deleteQuoteApi
} from '@/services/api/quotes'
import LoadingPageMini from '@/ui/LoadingPageMini.vue'

import EditIcon from '../icons/EditIcon.vue'
import TrashIcon from '../icons/TrashIcon.vue'
import { computed } from 'vue'
import { useQuotesStore } from '@/stores/QuotesStore'
import { ref } from 'vue'
import CommentsIcon from '../icons/CommentsIcon.vue'
import CommentItem from '../dashboard/post/CommentItem.vue'
import LikesIcon from '../icons/LikesIcon.vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/AuthStore'
import type { QuotesData } from '@/types'
import { useMoviesStore } from '@/stores/MoviesStore'
import { useRoute } from 'vue-router'

const { t } = useI18n()
const quotesStore = useQuotesStore()
const { userData } = storeToRefs(useAuthStore())
const { getMovie } = useMoviesStore()
const quoteData = ref<QuotesData | null>(null)
const loading = ref(false)
const commentInput = ref('')
const { name, params, query } = useRoute()
const userHasLiked = computed(() => {
  return quoteData.value?.likes.find((item) => item.user_id === userData.value.id)
})

function closeModal() {
  quotesStore.closeViewQuoteModal()
}

async function updateLike() {
  if (quoteData.value) await updateLikeApi(quoteData.value?.id)
  await getQuote(false)
  if (name === 'movie-show') getMovie(params.movieId.toString(), false)
}

async function addComment() {
  if (commentInput.value) {
    if (quoteData.value) await addCommentApi(quoteData.value.id, commentInput.value)

    await getQuote(false)
    if (name === 'movie-show') getMovie(params.movieId.toString(), false)
    commentInput.value = ''
  }
}

function openEditModal() {
  closeModal()
  if (quoteData.value) quotesStore.openEditQuoteModal(quoteData.value?.id)
}

async function deleteQuote() {
  if (quoteData.value) await deleteQuoteApi(quoteData.value?.id)
  if (name === 'dashboard') quotesStore.getQuotes(query)
  closeModal()
  if (name === 'movie-show') getMovie(params.movieId.toString())
}

async function getQuote(showSpinner = true) {
  try {
    if (showSpinner) loading.value = true
    const {
      data: { data }
    } = await getQuoteApi(quotesStore.viewQuoteModal.id)
    quoteData.value = data
  } catch (err) {
    //
  } finally {
    loading.value = false
  }
}
getQuote()
</script>
