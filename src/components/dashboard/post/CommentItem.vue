<template>
  <li class="border-b border-grey-rare space-y-4 pb-4 lg:pb-0 lg:border-none">
    <div class="flex items-center gap-4">
      <div class="w-10 h-10 lg:w-12 lg:h-12 shrink-0 rounded-full">
        <img
          v-if="comment.user.profile_image"
          :src="comment.user.profile_image"
          class="w-full h-full rounded-full object-cover"
        />
        <img v-else src="@/assets/avatar.png" class="w-full h-full rounded-full object-cover" />
      </div>
      <div class="w-full">
        <h1>
          {{ comment.user.username }}
        </h1>
        <p class="hidden lg:block break-all border-b border-grey-rare pb-4">
          {{ comment.comment }}
        </p>
      </div>
    </div>
    <p class="lg:hidden font-semibold break-all">{{ comment.comment }}</p>
  </li>
</template>

<script setup lang="ts">
import type { Comment } from '@/types'
defineProps<{
  comment: Comment
}>()
</script>
