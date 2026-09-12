<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-surface-200">
    <div class="container mx-auto flex items-center justify-between h-16">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2 font-bold text-xl text-primary-600">
        <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" stroke-width="2"/>
          <path d="M2 10H22" stroke="currentColor" stroke-width="2"/>
          <circle cx="12" cy="12" r="2" fill="currentColor"/>
          <path d="M6 6L8 10L6 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M18 6L16 10L18 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <span>电路仿真实验室</span>
      </router-link>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-6">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="text-surface-600 hover:text-primary-600 transition-colors font-medium"
          active-class="text-primary-600"
        >
          {{ item.label }}
        </router-link>
      </div>

      <!-- Right Actions -->
      <div class="flex items-center gap-3">
        <button
          class="p-2 rounded-lg hover:bg-surface-100 transition-colors"
          aria-label="搜索"
        >
          <svg class="w-5 h-5 text-surface-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </button>

        <button
          class="p-2 rounded-lg hover:bg-surface-100 transition-colors md:hidden"
          @click="isMenuOpen = !isMenuOpen"
          aria-label="菜单"
        >
          <svg class="w-6 h-6 text-surface-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isMenuOpen" class="md:hidden bg-white border-b border-surface-200">
        <div class="container py-4 flex flex-col gap-2">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="px-4 py-2 rounded-lg hover:bg-surface-50 text-surface-600 hover:text-primary-600 transition-colors"
            active-class="bg-primary-50 text-primary-600"
            @click="isMenuOpen = false"
          >
            {{ item.label }}
          </router-link>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isMenuOpen = ref(false);

const navItems = [
  { label: '首页', path: '/' },
  { label: '电路图', path: '/circuits' },
  { label: '仿真器', path: '/simulator' },
  { label: '三相电', path: '/three-phase' },
  { label: 'PLC', path: '/plc' },
  { label: '仓库', path: '/repository' },
  { label: '投稿', path: '/submission' },
];
</script>