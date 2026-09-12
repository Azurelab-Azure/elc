<template>
  <div class="dock-wrapper">
    <nav class="dock">
      <router-link
        v-for="item in items"
        :key="item.path"
        :to="item.path"
        class="dock-item"
        :class="{ 'dock-item-active': isActive(item.path) }"
      >
        <div class="dock-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path :d="item.icon" />
          </svg>
        </div>
        <span class="dock-label">{{ item.label }}</span>
        <span v-if="isActive(item.path)" class="dock-dot"></span>
      </router-link>

      <div class="dock-divider"></div>

      <button
        class="dock-item dock-theme"
        :title="themeTitle"
        @click="toggleTheme"
      >
        <div class="dock-icon">
          <svg v-if="isDark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
          </svg>
        </div>
        <span class="dock-label">{{ isDark ? '浅色' : '深色' }}</span>
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useThemeStore } from '../../store/themeStore';

const route = useRoute();
const themeStore = useThemeStore();

const isDark = computed(() => themeStore.isDark);
const themeTitle = computed(() => isDark.value ? '切换到浅色模式' : '切换到深色模式');

const toggleTheme = () => {
  themeStore.toggle();
};

const items = [
  { path: '/', label: '首页', icon: 'M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10' },
  { path: '/repository', label: '电路图', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM9 9h6v6H9V9z' },
  { path: '/simulator', label: '仿真', icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664zM21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { path: '/three-phase', label: '三相电', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { path: '/plc', label: 'PLC', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z' },
  { path: '/oscilloscope', label: '示波器', icon: 'M3 12h4l3-9 4 18 3-9h4' },
  { path: '/editor', label: '绘制', icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' },
  { path: '/documents', label: '文档', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { path: '/submission', label: '投稿', icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' }
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
  z-index: 50;
  display: flex;
  justify-content: center;
  padding: 0 16px 20px;
  pointer-events: none;
}

.dock {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  padding: 8px 12px;
  background: var(--glass-bg);
  backdrop-filter: saturate(180%) blur(24px);
  -webkit-backdrop-filter: saturate(180%) blur(24px);
  border: 0.5px solid var(--glass-border);
  border-radius: 24px;
  box-shadow: var(--glass-shadow);
  pointer-events: auto;
  max-width: calc(100vw - 32px);
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
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
  padding: 8px 12px;
  border-radius: 16px;
  color: var(--color-text-primary);
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 60px;
  flex-shrink: 0;
  background: transparent;
}

.dock-item:hover {
  background: var(--color-bg-hover);
  transform: translateY(-4px) scale(1.08);
}

.dock-item:active {
  transform: translateY(-2px) scale(1.04);
}

.dock-item-active {
  color: var(--color-blue);
}

.dock-item-active:hover {
  background: rgba(0, 113, 227, 0.08);
}

.dock-divider {
  width: 1px;
  height: 32px;
  background: var(--color-border-strong);
  margin: 0 4px;
  flex-shrink: 0;
  align-self: center;
}

.dock-theme {
  color: var(--color-orange);
}

.dock-theme:hover {
  background: rgba(255, 149, 0, 0.1);
}

.dock-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dock-icon svg {
  width: 100%;
  height: 100%;
}

.dock-label {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1;
  white-space: nowrap;
  font-family: var(--font-text);
}

.dock-dot {
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--color-blue);
}

@media (max-width: 1024px) {
  .dock {
    gap: 2px;
    padding: 6px 10px;
    border-radius: 22px;
  }

  .dock-item {
    min-width: 54px;
    padding: 6px 10px;
  }

  .dock-icon {
    width: 22px;
    height: 22px;
  }
}

@media (max-width: 768px) {
  .dock-wrapper {
    padding: 0 12px 16px;
  }

  .dock {
    gap: 0;
    padding: 6px 8px;
    border-radius: 20px;
  }

  .dock-item {
    min-width: 48px;
    padding: 6px 8px;
  }

  .dock-icon {
    width: 20px;
    height: 20px;
  }

  .dock-label {
    font-size: 9px;
  }
}

@media (max-width: 640px) {
  .dock-wrapper {
    padding: 0 8px 12px;
  }

  .dock {
    gap: 0;
    padding: 6px;
    border-radius: 18px;
  }

  .dock-item {
    min-width: 42px;
    padding: 8px;
    gap: 0;
  }

  .dock-icon {
    width: 22px;
    height: 22px;
  }

  .dock-label {
    display: none;
  }

  .dock-dot {
    bottom: 4px;
  }

  .dock-divider {
    height: 24px;
    margin: 0 2px;
  }
}

@media (max-width: 480px) {
  .dock-item {
    min-width: 38px;
    padding: 6px;
  }

  .dock-icon {
    width: 20px;
    height: 20px;
  }
}

@media (max-height: 500px) and (orientation: landscape) {
  .dock-wrapper {
    padding-bottom: 8px;
  }

  .dock {
    padding: 4px 8px;
  }

  .dock-item {
    padding: 4px 8px;
  }

  .dock-label {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .dock-item {
    transition: none;
  }

  .dock-item:hover {
    transform: none;
  }
}
</style>