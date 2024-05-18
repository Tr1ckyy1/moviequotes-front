<template>
  <li
    class="bg-grey-main w-fit flex items-center gap-4"
    :class="id ? 'rounded-sm px-2 py-0.5' : 'rounded px-3 py-1.5'"
  >
    <span class="text-sm" :class="id ? 'text-sm' : 'text-lg font-bold'">{{ props.name }}</span>
    <SmallXIcon v-if="id" @click="removeItem" />
  </li>
</template>

<script setup lang="ts">
import SmallXIcon from '../icons/SmallXIcon.vue'
const props = defineProps<{
  name: string
  id?: number
}>()

const emit = defineEmits<{
  (e: 'remove', id: number): void
}>()
function removeItem() {
  if (props.id) emit('remove', props.id)
}
</script>
