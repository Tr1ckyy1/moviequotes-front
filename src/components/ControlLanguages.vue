<template>
  <select class="text-white bg-[#11101A] outline-none border-none pr-1 lg:pr-2" v-model="locale">
    <option value="en">En</option>
    <option value="ka">ქა</option>
  </select>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Cookies from 'js-cookie'

import { watch } from 'vue'
const { locale } = useI18n()

watch(locale, (value) => {
  Cookies.set('locale', value)
})

if (Cookies.get('locale')) locale.value = Cookies.get('locale') ?? 'en'
</script>
