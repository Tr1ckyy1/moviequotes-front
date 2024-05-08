<template>
  <div
    class="py-7 px-7 lg:rounded-xl bg-dark-main lg:text-xl flex flex-col justify-between max-h-[52rem] lg:max-h-[70rem] gap-7"
  >
    <div class="overflow-y-auto scrollbar-none space-y-4">
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 lg:w-[52px] lg:h-[52px]">
          <img
            src="@/assets/landing-image-1-desktop.png"
            class="w-full h-full rounded-full object-cover"
          />
        </div>
        <h1>Omar Jangavadze</h1>
      </div>
      <p class="font-semibold">
        “Follow your dream.” movie- <span class="text-main">Billy Elliot.</span> (2000)
      </p>
      <img
        src="@/assets/landing-image-1-desktop.png"
        class="rounded-xl min-h-[12rem] w-full object-cover max-h-[31rem]"
      />
      <div class="flex items-center gap-6 border-b border-grey-rare pb-4">
        <span class="flex gap-4 items-center">3 <CommentsIcon /></span>
        <span class="flex gap-4 items-center">10 <LikesIcon /></span>
      </div>
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
    </div>

    <div class="flex gap-4">
      <div class="w-10 h-10 lg:w-[52px] lg:h-[52px] shrink-0">
        <img
          v-if="userData?.profileImage"
          :src="userData?.profileImage"
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
  </div>
</template>

<script setup lang="ts">
import CommentsIcon from '@/components/icons/CommentsIcon.vue'
import LikesIcon from '@/components/icons/LikesIcon.vue'
import CommentItem from './CommentItem.vue'
import { useAuthStore } from '@/stores/AuthStore'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { userData } = storeToRefs(useAuthStore())
</script>
