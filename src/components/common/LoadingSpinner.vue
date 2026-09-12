<template>
  <div class="flex flex-col items-center justify-center gap-4" :class="containerClass">
    <div
      class="rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin"
      :class="sizeClass"
    />
    <p v-if="text" class="text-surface-500 text-sm">
      {{ text }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}>();

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-6 h-6 border-2';
    case 'lg':
      return 'w-12 h-12 border-4';
    default:
      return 'w-8 h-8 border-3';
  }
});

const containerClass = computed(() => {
  return props.fullScreen ? 'fixed inset-0 z-50 bg-white/80 backdrop-blur-sm' : '';
});
</script>