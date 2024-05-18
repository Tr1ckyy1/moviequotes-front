<template>
  <div>
    <div class="relative mb-2">
      <Field
        :id="id"
        type="text"
        :name="name"
        :placeholder="placeholder"
        class="border bg-transparent w-full outline-none py-2.5 pl-4 pr-12 rounded-md placeholder:text-grey-main"
        :validateOnInput="true"
        :validateOnBlur="false"
        :class="error ? 'border-red-main' : 'border-grey-main'"
      />
      <label class="absolute top-1/2 -translate-y-1/2 right-4 text-grey-main" :for="id">{{
        lang
      }}</label>
    </div>
    <ErrorMessage class="text-red-main" :name="name" />
  </div>
</template>

<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'

defineProps<{
  id: string
  placeholder?: string
  name: string
  lang: string
  error?: string
}>()
</script>
