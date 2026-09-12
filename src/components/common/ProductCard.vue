<template>
  <div class="product-card group cursor-pointer" @click="$emit('select', product)">
    <div class="relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300">
      <!-- 图片区域 -->
      <div class="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <img 
          :src="product.thumbnail" 
          :alt="product.title"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <!-- 分类标签 -->
        <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700">
          {{ product.category }}
        </span>
        <!-- 收藏按钮 -->
        <button 
          class="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
          @click.stop="$emit('favorite', product)"
        >
          <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
      </div>
      
      <!-- 内容区域 -->
      <div class="p-4">
        <h3 class="text-sm font-semibold text-gray-900 line-clamp-1">{{ product.title }}</h3>
        <p class="mt-1 text-xs text-gray-500 line-clamp-2">{{ product.description }}</p>
        
        <div class="mt-3 flex items-center justify-between">
          <div class="flex items-center space-x-1">
            <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span class="text-xs font-medium text-gray-700">{{ product.rating }}</span>
            <span class="text-xs text-gray-400">({{ product.reviews }})</span>
          </div>
          <span class="text-sm font-semibold text-blue-600">{{ product.usedCount }}人使用</span>
        </div>
        
        <!-- 操作按钮 -->
        <div class="mt-4 flex space-x-2">
          <button 
            class="flex-1 py-2 px-4 rounded-lg bg-blue-500 text-white text-xs font-medium hover:bg-blue-600 transition-colors"
            @click.stop="$emit('open', product)"
          >
            打开
          </button>
          <button 
            class="flex-1 py-2 px-4 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200 transition-colors"
            @click.stop="$emit('preview', product)"
          >
            预览
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Product {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  rating: number;
  reviews: number;
  usedCount: number;
}

defineProps<{
  product: Product;
}>();

defineEmits<{
  (e: 'select', product: Product): void;
  (e: 'favorite', product: Product): void;
  (e: 'open', product: Product): void;
  (e: 'preview', product: Product): void;
}>();
</script>