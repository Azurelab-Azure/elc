<template>
  <div class="dock-root" :class="[`dock-root-${position}`, `mode-${mode}`]">
    <div class="dock-hover-zone">
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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppIcon from './AppIcon.vue';
import { useThemeStore } from '../../store/themeStore';
import { useSettingsStore } from '../../store/settingsStore';
import type { IconName } from '../../utils/icons';

const route = useRoute();
const themeStore = useThemeStore();
const settings = useSettingsStore();

const isDark = computed(() => themeStore.isDark);
const toggleTheme = () => themeStore.toggle();

const position = computed(() => settings.dockPosition);
const mode = computed(() => settings.dockMode);

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
  { path: '/settings', label: '设置', icon: 'settings' }
];

const isActive = (path: string): boolean => {
  if (path === '/') return route.path === '/';
  return route.path.startsWith(path);
};
</script>

<style scoped>
.dock-root {
  position: fixed;
  z-index: 100;
  pointer-events: none;
}

/* ============ 底部 ============ */
.dock-root-bottom {
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}

.dock-root-bottom .dock-hover-zone {
  padding: 0 16px 24px;
  display: flex;
  justify-content: center;
}

.dock-root-bottom.mode-auto-hide .dock-hover-zone {
  padding-bottom: 0;
}

.dock-root-bottom.mode-auto-hide .dock {
  transform: translateY(calc(100% + 2px));
}

.dock-root-bottom.mode-auto-hide .dock-hover-zone:hover .dock {
  transform: translateY(0);
}

/* ============ 顶部 ============ */
.dock-root-top {
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}

.dock-root-top .dock-hover-zone {
  padding: 24px 16px 0;
  display: flex;
  justify-content: center;
}

.dock-root-top.mode-auto-hide .dock-hover-zone {
  padding-top: 0;
}

.dock-root-top.mode-auto-hide .dock {
  transform: translateY(calc(-100% - 2px));
}

.dock-root-top.mode-auto-hide .dock-hover-zone:hover .dock {
  transform: translateY(0);
}

/* ============ 左侧 ============ */
.dock-root-left {
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
}

.dock-root-left .dock-hover-zone {
  padding: 16px 0 16px 24px;
  display: flex;
  align-items: center;
}

.dock-root-left.mode-auto-hide .dock-hover-zone {
  padding-left: 0;
}

.dock-root-left.mode-auto-hide .dock {
  transform: translateX(calc(-100% - 2px));
}

.dock-root-left.mode-auto-hide .dock-hover-zone:hover .dock {
  transform: translateX(0);
}

/* ============ 右侧 ============ */
.dock-root-right {
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
}

.dock-root-right .dock-hover-zone {
  padding: 16px 24px 16px 0;
  display: flex;
  align-items: center;
}

.dock-root-right.mode-auto-hide .dock-hover-zone {
  padding-right: 0;
}

.dock-root-right.mode-auto-hide .dock {
  transform: translateX(calc(100% + 2px));
}

.dock-root-right.mode-auto-hide .dock-hover-zone:hover .dock {
  transform: translateX(0);
}

/* ============ 触发区尺寸（关键） ============ */
/* 自动隐藏时，hover-zone 变成一个靠近边缘的热区 */

.dock-root-bottom.mode-auto-hide .dock-hover-zone {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 12px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  pointer-events: auto;
}

.dock-root-top.mode-auto-hide .dock-hover-zone {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 12px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  pointer-events: auto;
}

.dock-root-left.mode-auto-hide .dock-hover-zone {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 12px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  pointer-events: auto;
}

.dock-root-right.mode-auto-hide .dock-hover-zone {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 12px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  pointer-events: auto;
}

/* ============ Dock 主体 ============ */
.dock-hover-zone {
  pointer-events: auto;
}

.dock {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 14px;
  border-radius: var(--radius-2xl);
  transition: transform 0.5s cubic-bezier(0.32, 0.72, 0, 1);
  will-change: transform;
}

.dock-root-left .dock,
.dock-root-right .dock {
  flex-direction: column;
  padding: 14px 10px;
}

/* ============ Dock 项 ============ */
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
}

.dock-root-bottom .dock-item:hover {
  transform: translateY(-6px) scale(1.1);
}

.dock-root-top .dock-item:hover {
  transform: translateY(6px) scale(1.1);
}

.dock-root-left .dock-item:hover {
  transform: translateX(6px) scale(1.1);
}

.dock-root-right .dock-item:hover {
  transform: translateX(-6px) scale(1.1);
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
  background: var(--border-default);
  flex-shrink: 0;
}

.dock-root-bottom .dock-divider,
.dock-root-top .dock-divider {
  width: 1px;
  height: 36px;
  margin: 0 6px;
}

.dock-root-left .dock-divider,
.dock-root-right .dock-divider {
  width: 36px;
  height: 1px;
  margin: 6px 0;
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
  border-radius: 50%;
  background: var(--color-blue);
  width: 4px;
  height: 4px;
}

.dock-root-bottom .dock-dot {
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
}

.dock-root-top .dock-dot {
  top: 4px;
  left: 50%;
  transform: translateX(-50%);
}

.dock-root-left .dock-dot {
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
}

.dock-root-right .dock-dot {
  left: 4px;
  top: 50%;
  transform: translateY(-50%);
}

/* ============ 响应式 ============ */
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
  .dock-root-bottom .dock-hover-zone:not(.mode-auto-hide .dock-hover-zone) {
    padding-bottom: 14px;
  }

  .dock-root-bottom:not(.mode-auto-hide) .dock-hover-zone {
    padding: 0 8px 14px;
  }

  .dock-root-top:not(.mode-auto-hide) .dock-hover-zone {
    padding: 14px 8px 0;
  }

  .dock-root-left:not(.mode-auto-hide) .dock-hover-zone {
    padding: 8px 0 8px 14px;
  }

  .dock-root-right:not(.mode-auto-hide) .dock-hover-zone {
    padding: 8px 14px 8px 0;
  }

  .dock {
    padding: 8px 10px;
    border-radius: var(--radius-xl);
  }

  .dock-root-left .dock,
  .dock-root-right .dock {
    padding: 10px 8px;
  }

  .dock-item {
    min-width: 48px;
    padding: 8px;
    gap: 0;
  }

  .dock-label {
    display: none;
  }

  .dock-root-bottom .dock-divider,
  .dock-root-top .dock-divider {
    height: 28px;
    margin: 0 4px;
  }

  .dock-root-left .dock-divider,
  .dock-root-right .dock-divider {
    width: 28px;
    margin: 4px 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .dock {
    transition: none;
  }
}
</style>