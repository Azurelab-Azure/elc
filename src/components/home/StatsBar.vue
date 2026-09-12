<template>
  <section class="py-12 bg-gradient-to-r from-blue-600 to-purple-600">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="text-center text-white"
        >
          <div class="text-3xl lg:text-4xl font-bold mb-2">
            {{ stat.value }}{{ stat.suffix }}
          </div>
          <div class="text-sm text-white/80">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCatalog } from '../../composables/useCatalog';

const { circuits, documents, categories } = useCatalog();

const stats = computed(() => [
  { value: circuits.value.length, suffix: '', label: '电路模板' },
  { value: documents.value.length, suffix: '', label: '文档资料' },
  { value: categories.value.length, suffix: '', label: '分类模块' },
  { value: 0, suffix: '', label: '在线用户' }
]);
</script>