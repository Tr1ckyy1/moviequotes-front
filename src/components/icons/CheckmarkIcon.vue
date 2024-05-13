<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 16 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.17405 13.1421L0.349053 8.19212C-0.550947 5.85212 1.38405 5.04212 2.82405 6.39212L5.29905 9.54212L12.9491 0.992115C14.2991 -0.425385 16.5491 0.384615 15.6491 2.56712L6.64905 12.9171C5.68155 14.0421 4.84905 13.8171 4.17405 13.1421Z"
      :fill="color"
    />
  </svg>
</template>

<script setup lang="ts">
type Props = {
  width?: string
  height?: string
  color?: string
}

withDefaults(defineProps<Props>(), {
  width: '16',
  height: '14',
  color: '#198754'
})
</script>
