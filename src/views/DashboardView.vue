<template>
  <section class="lg:space-y-4">
    <div class="flex gap-7">
      <div
        class="lg:bg-[#24222F] pb-5 px-7 pt-0 lg:pt-4 lg:rounded-llg w-full flex gap-4 items-center lg:cursor-pointer"
        :class="searchFocused && 'w-fit'"
      >
        <NewQuoteIcon />
        <p class="whitespace-nowrap">{{ t('dashboard.new_quote') }}</p>
      </div>
      <label
        class="hidden lg:flex lg:cursor-pointer gap-4"
        for="dashboard-search"
        :class="searchFocused && 'w-full'"
      >
        <SearchIcon class="self-center" />
        <input
          class="outline-none text-xl text-right bg-transparent focus:text-left focus:w-full text-[#CED4DA] placeholder:text-[#CED4DA] focus:border-b focus:border-[#EFEFEF4D]"
          :class="locale === 'ka' ? 'w-16' : 'w-24'"
          id="dashboard-search"
          @focus="searchFocused = true"
          @blur="searchFocused = false"
          :placeholder="searchFocused ? t('dashboard.search_focused') : t('dashboard.search')"
        />
      </label>
    </div>
    <div class="space-y-8 max-w-screen-lg">
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
    </div>
  </section>
</template>

<script setup lang="ts">
import NewQuoteIcon from '@/components/icons/NewQuoteIcon.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import PostItem from '@/components/post/PostItem.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const searchFocused = ref(false)

const { t, locale } = useI18n()
</script>
