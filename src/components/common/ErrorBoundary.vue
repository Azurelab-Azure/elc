<template>
  <div v-if="hasError" class="error-boundary">
    <div class="flex flex-col items-center justify-center min-h-[400px] p-8">
      <svg class="w-16 h-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
      </svg>
      <h2 class="text-lg font-semibold text-gray-900 mb-2">页面加载出错</h2>
      <p class="text-sm text-gray-500 mb-4">{{ errorMessage }}</p>
      <button 
        class="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
        @click="reset"
      >
        重试
      </button>
    </div>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue';

const hasError = ref(false);
const errorMessage = ref('');

onErrorCaptured((err: Error) => {
  hasError.value = true;
  errorMessage.value = err.message || '未知错误';
  return false;
});

const reset = () => {
  hasError.value = false;
  errorMessage.value = '';
};
</script>