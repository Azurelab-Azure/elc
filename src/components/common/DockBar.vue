<template>
  <div class="dock-wrapper">
    <nav class="dock glass-strong">
      <router-link
        v-for="item in items"
        :key="item.path"
        :to="item.path"
        class="dock-item"
        :class="{ 'dock-item-active': isActive(item.path) }"
      >
        <AppIcon :name="item.icon" :size="26" />
        <span class="dock-label">{{ item.label }}</span>
        <span v-if="isActive(item.path)" class="dock-dot"></span>
      </router-link>

      <div class="dock-divider"></div>

      <button class="dock-item dock-theme" @click="toggleTheme">
        <AppIcon :name="isDark ? 'sun' : 'moon'" :size="26" />
        <span class="dock-label">{{ isDark ? '浅色' : '深色' }}</span>
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppIcon from './AppIcon.vue';
import { useThemeStore } from '../../store/themeStore';
import type { IconName } from '../../utils/icons';

const route = useRoute();
const themeStore = useThemeStore();

const isDark = computed(() => themeStore.isDark);
const toggleTheme = () => themeStore.toggle();

interface DockItem {
  path: string;
  label: string;
  icon: IconName;
}

const items: DockItem[] = [
  { path: '/', label: '首页', icon: 'home' },
  { path: '/teaching', label: '电路教学', icon: 'teaching' },
  { path: '/simulation', label: '电路仿真', icon: 'simulation' },
  { path: '/circuit', label: '电路图', icon: 'circuit' },
  { path: '/about', label: '关于', icon: 'about' }
];

const isActive = (path: string): boolean => {
  if (path === '/') return route.path === '/';
  return route.path.startsWith(path);
};
</script>

<style scoped>
.dock-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  padding: 0 16px 24px;
  pointer-events: none;
}

.dock {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  padding: 10px 14px;
  border-radius: var(--radius-2xl);
  pointer-events: auto;
  max-width: calc(100vw - 32px);
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
}

.dock::-webkit-scrollbar {
  display: none;
}

.dock-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 14px;
  border-radius: var(--radius-lg);
  color: var(--text-primary);
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 68px;
  flex-shrink: 0;
  background: transparent;
}

.dock-item:hover {
  background: var(--glass-bg-weak);
  transform: translateY(-6px) scale(1.1);
}

.dock-item-active {
  color: var(--color-blue);
}

.dock-item-active::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--radius-lg);
  background: var(--color-blue-soft);
  z-index: -1;
}

.dock-divider {
  width: 1px;
  height: 36px;
  background: var(--border-default);
  margin: 0 6px;
  flex-shrink: 0;
  align-self: center;
}

.dock-theme {
  color: var(--color-orange);
}

.dock-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1;
  white-space: nowrap;
  color: var(--text-secondary);
}

.dock-item-active .dock-label {
  color: var(--color-blue);
}

.dock-dot {
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--color-blue);
}

@media (max-width: 768px) {
  .dock-item {
    min-width: 56px;
    padding: 8px 10px;
  }

  .dock-label {
    font-size: 10px;
  }
}

@media (max-width: 640px) {
  .dock-wrapper {
    padding: 0 8px 14px;
  }

  .dock {
    padding: 8px 10px;
    border-radius: var(--radius-xl);
  }

  .dock-item {
    min-width: 48px;
    padding: 8px;
    gap: 0;
  }

  .dock-label {
    display: none;
  }

  .dock-divider {
    height: 28px;
    margin: 0 4px;
  }
}
</style>