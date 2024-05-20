<template>
  <div @click="triggerModal" class="relative lg:place-self-start lg:ml-auto" ref="modalContainer">
    <ThreeDotsIcon class="cursor-pointer" />

    <ul
      @click.stop
      v-if="modalOpen"
      class="absolute bg-dark-third right-0 bottom-6 min-w-60 max-w-full rounded-llg px-10 py-8 break-all max-h-60 overflow-y-scroll scrollbar space-y-8 lg:left-0 lg:top-6 lg:bottom-auto"
    >
      <li
        class="flex items-center gap-4 lg:hover:brightness-75 cursor-pointer"
        @click="handleClick"
      >
        <ViewQuoteIcon />
        <span>{{ t('show.view_quote') }}</span>
      </li>
      <li class="flex items-center gap-4 lg:hover:brightness-75 cursor-pointer">
        <EditIcon />
        <span>{{ t('show.edit') }}</span>
      </li>
      <li class="flex items-center gap-4 lg:hover:brightness-75 cursor-pointer">
        <TrashIcon />
        <span>{{ t('show.delete') }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ViewQuoteIcon from '../icons/ViewQuoteIcon.vue'
import EditIcon from '../icons/EditIcon.vue'
import TrashIcon from '../icons/TrashIcon.vue'
import ThreeDotsIcon from '../icons/ThreeDotsIcon.vue'
import { onMounted, ref } from 'vue'
import { onBeforeUnmount } from 'vue'
import { useMoviesStore } from '@/stores/MoviesStore'

const props = defineProps<{
  id: number
}>()

const { t } = useI18n()

const modalContainer = ref<HTMLDivElement | null>(null)
const modalOpen = ref(false)
const { openViewQuoteModal } = useMoviesStore()

function handleClick() {
  openViewQuoteModal(props.id)
}

function triggerModal() {
  modalOpen.value = !modalOpen.value
}

function handleClickOutside(e: Event) {
  if (modalContainer.value && !modalContainer.value.contains(e.target as Node)) {
    modalOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
