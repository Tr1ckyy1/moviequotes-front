<template>
  <section
    class="w-full sticky top-0 before:bg-[linear-gradient(to_bottom,black_0%,transparent_50%),linear-gradient(to_right,black_0%,transparent_50%)] before:w-full before:absolute before:top-0 before:left-0 before:bottom-0"
  >
    <div
      class="absolute top-1/2 -translate-y-1/2 lg:-translate-y-0 lg:top-1/3 left-12 lg:left-32 space-y-4 w-[70%] lg:w-2/5"
    >
      <h1
        class="text-white font-bold lg:text-5xl before:lg:w-12 before:w-4 before:h-[2px] before:bg-white relative before:absolute before:right-full before:mr-4 before:top-8 text-xl leading-relaxed lg:leading-relaxed"
      >
        “{{ quote }}”
      </h1>
      <p class="text-[#D9D9D9] lg:text-3xl font-bold">{{ movie }}</p>
    </div>

    <slot></slot>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  quote: string
  movie: string
}>()
</script>
