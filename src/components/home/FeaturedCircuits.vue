<template>
  <section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between mb-12">
        <div>
          <h2 class="text-3xl font-bold text-gray-900">精选电路</h2>
          <p class="mt-2 text-gray-600">来自 beta/circuits 的电路数据</p>
        </div>
        <button
          class="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          @click="$router.push('/repository')"
        >
          查看全部
        </button>
      </div>

      <div v-if="loading" class="flex justify-center py-12">
        <LoadingSpinner />
      </div>

      <div v-else-if="error" class="text-center py-12 text-red-500">
        {{ error }}
      </div>

      <div v-else-if="circuits.length === 0" class="text-center py-12 text-gray-500">
        <p>暂无电路数据</p>
        <p class="text-sm mt-2">请将电路 HTML 文件放到 beta/circuits/ 目录</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductCard
          v-for="circuit in circuits.slice(0, 6)"
          :key="circuit.id"
          :product="toProduct(circuit)"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import ProductCard from '../common/ProductCard.vue';
import LoadingSpinner from '../common/LoadingSpinner.vue';
import { useCatalog } from '../../composables/useCatalog';
import type { CircuitItem } from '../../engines/dataLoader';

const { circuits, loading, error, load } = useCatalog();

const toProduct = (circuit: CircuitItem) => ({
  id: circuit.id,
  title: circuit.name,
  description: circuit.description,
  thumbnail: circuit.thumbnail || '',
  category: circuit.category,
  rating: 0,
  reviews: 0,
  usedCount: 0
});

onMounted(load);
</script>