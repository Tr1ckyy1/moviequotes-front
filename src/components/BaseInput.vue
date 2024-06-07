<template>
  <div class="flex flex-col gap-2.5 mb-4">
    <label class="text-white text-sm xxs:text-base" :for="id"
      >{{ title }} <span class="text-red-main">*</span></label
    >
    <div class="flex flex-col relative gap-2">
      <Field
        :id="id"
        :type="inputType"
        :placeholder="placeholder"
        :name="name"
        class="border-2 focus:border-grey-main peer text-grey-main placeholder:text-grey-main bg-grey-secondary pl-4 py-2 pr-9 outline-none rounded-[4px] text-xs xxs:text-[0.95rem] lg:text-base"
        :class="{
          'border-red-main': error,
          'border-profile-green': !error && value,
          'pr-[60px]': input === 'password'
        }"
        :validateOnInput="true"
        :validateOnBlur="false"
      />
      <ErrorIcon
        class="absolute right-4 top-1/2 -translate-y-1/2"
        v-if="error"
        :class="{ 'right-[38px]': input === 'password' }"
      />
      <CheckmarkIcon
        class="absolute right-4 top-1/2 -translate-y-1/2 block peer-placeholder-shown:hidden peer-invalid:hidden"
        :class="{ 'right-[38px]': input === 'password' }"
        v-else
      />

      <ShowIcon
        @click="passwordIsVisible = false"
        class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
        v-if="input === 'password'"
      />
      <HideIcon
        @click="passwordIsVisible = true"
        class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
        v-if="!passwordIsVisible && input === 'password'"
      />
    </div>
    <ErrorMessage class="text-red-main" :name="name" />
  </div>
</template>

<script setup lang="ts">
import ErrorIcon from '@/components/icons/ErrorIcon.vue'
import CheckmarkIcon from '@/components/icons/CheckmarkIcon.vue'
import ShowIcon from '@/components/icons/ShowIcon.vue'
import HideIcon from '@/components/icons/HideIcon.vue'
import { Field, ErrorMessage } from 'vee-validate'
import { computed, ref } from 'vue'

const {
  title,
  placeholder = '',
  input = 'text',
  name = '',
  id,
  value
} = defineProps<{
  title: string
  placeholder?: string
  input?: string
  name?: string
  id: string
  error?: string
  value: string | undefined
}>()

const passwordIsVisible = ref(false)
const inputType = computed(() => {
  if (input === 'password') return passwordIsVisible.value ? 'text' : 'password'
  return input
})
</script>
