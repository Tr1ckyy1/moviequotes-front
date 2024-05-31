<template>
  <div
    ref="container"
    @click="toggleModal"
    class="bg-transparent text-white relative cursor-pointer z-10"
  >
    <div class="flex items-center gap-4">
      <h1>{{ selectedOption }}</h1>
      <ArrowDown />
    </div>

    <div
      v-if="modalShowing"
      class="absolute w-full bg-transparent border-x border-b border-dark-third"
    >
      <div
        class="hover:bg-[#1a1b26]"
        :class="opt.text === selectedOption ? 'bg-[#1a1b26]' : 'bg-dark-third'"
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
import ArrowDown from './icons/ArrowDown.vue'

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
  Cookies.set('locale', value, {
    domain: import.meta.env.VITE_SHARED_DOMAIN
  })
  const selectedText = options.value.find((opt) => opt.value === value)?.text
  selectedOption.value = selectedText || 'En'
}

watch(locale, (value) => {
  const selectedText = options.value.find((opt) => opt.value === value)?.text
  selectedOption.value = selectedText || 'En'
  document.documentElement.lang = value
})

const localeCookie = Cookies.get('locale')

if (localeCookie) {
  document.documentElement.lang = localeCookie
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
