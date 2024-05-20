<template>
  <li class="border-b border-grey-rare space-y-4 pb-4">
    <div class="flex items-center gap-4">
      <div class="w-10 h-10 lg:w-12 lg:h-12 shrink-0">
        <img :src="comment.user.profile_image" class="w-full h-full rounded-full object-cover" />
      </div>
      <h1>
        {{ comment.user.username }}
      </h1>
    </div>
    <p class="font-semibold break-all">{{ comment.comment }}</p>
  </li>
</template>

<script setup lang="ts">
import type { Comment } from '@/types'
defineProps<{
  comment: Comment
}>()
</script>
