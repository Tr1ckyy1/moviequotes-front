<template>
  <li class="bg-dark-main px-7 py-4 space-y-6">
    <img :src="image" class="w-full rounded-sm h-36 object-cover" />
    <p class="text-grey-secondary text-2xl border-b border-[#EFEFEF33] pb-6">
      "Love means never having to say you're sorry."
    </p>
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-6 pb-4">
        <div class="flex gap-4 items-center">
          <span class="text-xl"> 3 </span>
          <CommentsIcon />
        </div>
        <div class="flex gap-4 items-center text-xl">
          <span class="text-xl"> 10 </span>
          <LikesIcon />
        </div>
      </div>
      <ThreeDotsIcon class="cursor-pointer" />
    </div>
  </li>
</template>

<script setup lang="ts">
import CommentsIcon from '../icons/CommentsIcon.vue'
import LikesIcon from '../icons/LikesIcon.vue'
import ThreeDotsIcon from '../icons/ThreeDotsIcon.vue'

defineProps<{
  image: string
}>()
</script>
