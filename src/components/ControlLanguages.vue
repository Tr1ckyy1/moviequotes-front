<template>
  <div
    ref="container"
    @click="toggleModal"
    class="bg-transparent text-white relative cursor-pointer"
  >
    <div class="flex items-center gap-4">
      <h1>{{ selectedOption }}</h1>
      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.24702 7.14L0.451017 1.658C-0.114983 1.012 0.345017 3.67706e-07 1.20402 3.67706e-07L10.796 3.67706e-07C10.9883 -0.000164459 11.1765 0.0550878 11.3381 0.159141C11.4998 0.263194 11.628 0.411637 11.7075 0.586693C11.7869 0.761749 11.8142 0.955998 11.7861 1.14618C11.758 1.33636 11.6757 1.51441 11.549 1.659L6.75302 7.139C6.65916 7.24641 6.5434 7.3325 6.41353 7.39148C6.28365 7.45046 6.14266 7.48098 6.00002 7.48098C5.85738 7.48098 5.71638 7.45046 5.58651 7.39148C5.45663 7.3325 5.34088 7.24641 5.24702 7.139V7.14Z"
          fill="white"
        />
      </svg>
    </div>

    <div
      v-if="modalShowing"
      class="absolute w-full bg-transparent border-x border-b border-[#24222F]"
    >
      <div
        class="hover:bg-[#1a1b26]"
        :class="opt.text === selectedOption ? 'bg-[#1a1b26]' : 'bg-[#24222F]'"
        v-for="opt in options"
        :key="opt.value"
        @click="selectOption(opt.value)"
      >
        {{ opt.text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Cookies from 'js-cookie'
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const { locale } = useI18n()

const options = ref([
  { value: 'en', text: 'En' },
  { value: 'ka', text: 'ქა' }
])

const modalShowing = ref(false)

const selectedOption = ref('En')

const container = ref<HTMLDivElement | null>(null)

function toggleModal() {
  modalShowing.value = !modalShowing.value
}

function selectOption(value: string) {
  locale.value = value
  Cookies.set('locale', value)
  const selectedText = options.value.find((opt) => opt.value === value)?.text
  selectedOption.value = selectedText || 'En'
}

watch(locale, (value) => {
  const selectedText = options.value.find((opt) => opt.value === value)?.text
  selectedOption.value = selectedText || 'En'
})

const localeCookie = Cookies.get('locale')

if (localeCookie) {
  locale.value = localeCookie
  selectedOption.value = options.value.find((opt) => opt.value === locale.value)?.text || 'En'
}

function handleClickOutside(e: Event) {
  if (container.value && !container.value.contains(e.target as Node)) {
    modalShowing.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
