<template>
  <li
    class="py-7 px-7 lg:rounded-xl bg-dark-main lg:text-xl grid grid-rows-[1fr_auto_1fr] max-h-[52rem] lg:max-h-[70rem] gap-7"
  >
    <div class="space-y-4">
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 lg:w-[52px] lg:h-[52px]">
          <img :src="quote.user.profile_image" class="w-full h-full rounded-full object-cover" />
        </div>
        <h1>{{ quote.user.username }}</h1>
      </div>
      <p class="font-semibold">
        “{{ quote.quote[locale as Language] }}” {{ t('dashboard.movie_name') }}-
        <span class="text-main">{{ quote.movie.name[locale as Language] }}.</span> ({{
          quote.movie.year
        }})
      </p>
      <img :src="quote.image" class="rounded-llg min-h-[12rem] w-full object-cover max-h-[31rem]" />
      <div class="flex items-center gap-6 border-b border-grey-rare pb-4">
        <div class="flex gap-4 items-center">
          <span class="text-xl">{{ quote.comments.length }}</span>
          <CommentsIcon />
        </div>
        <div class="flex gap-4 items-center">
          <span class="text-xl"> {{ quote.likes.length }} </span>
          <LikesIcon class="cursor-pointer" />
        </div>
      </div>
    </div>
    <div class="overflow-y-auto scrollbar space-y-4">
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
    </div>
    <div class="flex gap-4">
      <div class="w-10 h-10 lg:w-[52px] lg:h-[52px] shrink-0">
        <img
          v-if="userData?.profile_image"
          :src="userData?.profile_image"
          class="object-cover rounded-full h-full w-full"
        />
        <img v-else src="@/assets/avatar.png" class="object-cover h-full w-full" />
      </div>
      <input
        type="text"
        class="w-full bg-dark-third rounded-llg outline-none px-4 text-grey-secondary placeholder:text-grey-secondary"
        :placeholder="t('dashboard.write_comment')"
      />
    </div>
  </li>
</template>

<script setup lang="ts">
import CommentsIcon from '@/components/icons/CommentsIcon.vue'
import LikesIcon from '@/components/icons/LikesIcon.vue'
import CommentItem from './CommentItem.vue'
import { useAuthStore } from '@/stores/AuthStore'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import type { Language, QuotesData } from '@/types'

const { t, locale } = useI18n()
const { userData } = storeToRefs(useAuthStore())

defineProps<{
  quote: QuotesData
}>()
</script>
