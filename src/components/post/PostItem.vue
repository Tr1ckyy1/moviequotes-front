<template>
  <div
    class="py-4 px-7 lg:rounded-xl space-y-4 bg-[#11101A] max-h-[52rem] lg:max-h-[70rem] overflow-y-auto scrollbar-none lg:text-xl"
  >
    <div class="flex items-center gap-4">
      <div class="w-10 h-10 lg:w-[52px] lg:h-[52px]">
        <img
          src="@/assets/landing-image-1-desktop.png"
          class="w-full h-full rounded-full object-cover"
        />
      </div>
      <h1 class="">Omar Jangavadze</h1>
    </div>
    <p class="font-semibold">
      “Follow your dream.” movie- <span class="text-main">Billy Elliot.</span> (2000)
    </p>
    <img
      src="@/assets/landing-image-1-desktop.png"
      class="rounded-xl min-h-[12rem] w-full object-cover max-h-[31rem]"
    />
    <div class="flex items-center gap-6 border-b border-[#EFEFEF4D] pb-4">
      <span class="flex gap-4 items-center">3 <CommentsIcon /></span>
      <span class="flex gap-4 items-center">10 <LikesIcon /></span>
    </div>
    <CommentItem />
    <!-- <CommentItem /> -->
    <CommentItem />
    <div class="flex gap-4">
      <img src="@/assets/avatar.png" />
      <input
        type="text"
        class="flex-grow bg-[#24222F] rounded-llg outline-none px-4 text-[#CED4DA] placeholder:text-[#CED4DA]"
        placeholder="Write a comment"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CommentsIcon from '@/components/icons/CommentsIcon.vue'
import LikesIcon from '@/components/icons/LikesIcon.vue'
import CommentItem from './CommentItem.vue'
</script>
