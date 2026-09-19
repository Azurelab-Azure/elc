<template>
  <svg
    class="app-icon"
    :width="size"
    :height="size"
    viewBox="0 0 1024 1024"
    fill="currentColor"
    aria-hidden="true"
  >
    <path :d="pathData" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { iconPaths, type IconName } from '../../utils/icons';

const props = withDefaults(defineProps<{
  name: IconName;
  size?: number | string;
}>(), {
  size: 24
});

const pathData = computed(() => iconPaths[props.name] || '');
</script>

<style scoped>
.app-icon {
  display: inline-block;
  flex-shrink: 0;
  vertical-align: middle;
}
</style>