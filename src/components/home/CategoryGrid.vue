<template>
  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900">功能模块</h2>
        <p class="mt-2 text-gray-600">选择您需要的仿真工具</p>
      </div>

      <div v-if="loading" class="flex justify-center py-12">
        <LoadingSpinner />
      </div>

      <div v-else-if="categories.length === 0" class="text-center py-12 text-gray-500">
        <p>暂无分类数据</p>
        <p class="text-sm mt-2">请在 beta/catalog.json 中配置分类信息</p>
      </div>

      <div v-else class="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="category in categories"
          :key="category.id"
          class="group cursor-pointer rounded-2xl p-6 bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
          @click="$router.push(category.path)"
        >
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            :class="getColorClass(category.color)"
          >
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path :d="category.icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-1">{{ category.name }}</h3>
          <p class="text-sm text-gray-500">{{ category.description }}</p>
          <div class="mt-4 inline-flex items-center text-sm text-blue-600 group-hover:translate-x-1 transition-transform">
            进入
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import LoadingSpinner from '../common/LoadingSpinner.vue';
import { useCatalog } from '../../composables/useCatalog';

const { categories, loading, load } = useCatalog();

const colorMap: Record<string, string> = {
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  green: 'bg-green-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
  indigo: 'bg-indigo-500'
};

const getColorClass = (color: string): string => {
  return colorMap[color] || 'bg-gray-500';
};

onMounted(load);
</script>