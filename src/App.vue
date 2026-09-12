<template>
  <div class="app-root" @contextmenu="handleContextMenu">
    <router-view />

    <ContextMenu ref="contextMenuRef" :groups="menuGroups" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ContextMenu, { type ContextMenuItem } from './components/common/ContextMenu.vue';
import { useThemeStore } from './store/themeStore';

const router = useRouter();
const themeStore = useThemeStore();
const contextMenuRef = ref<InstanceType<typeof ContextMenu> | null>(null);

const menuGroups = computed<ContextMenuItem[][]>(() => {
  const navigationGroup: ContextMenuItem[] = [
    {
      id: 'home',
      label: '返回首页',
      icon: 'M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10',
      shortcut: 'Alt+H',
      action: () => router.push('/')
    },
    {
      id: 'back',
      label: '返回上一页',
      icon: 'M15 19l-7-7 7-7',
      shortcut: 'Alt+←',
      action: () => router.back()
    },
    {
      id: 'forward',
      label: '前进下一页',
      icon: 'M9 5l7 7-7 7',
      shortcut: 'Alt+→',
      action: () => router.forward()
    }
  ];

  const pageGroup: ContextMenuItem[] = [
    {
      id: 'refresh',
      label: '刷新页面',
      icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
      shortcut: 'F5',
      action: () => window.location.reload()
    },
    {
      id: 'copy',
      label: '复制链接',
      icon: 'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z',
      shortcut: 'Ctrl+C',
      action: () => navigator.clipboard.writeText(window.location.href)
    },
    {
      id: 'open-new',
      label: '新窗口打开',
      icon: 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14',
      action: () => window.open(window.location.href, '_blank')
    }
  ];

  const themeGroup: ContextMenuItem[] = [
    {
      id: 'theme-light',
      label: '浅色模式',
      icon: 'M12 3v2M12 19v2M5.64 5.64l1.41 1.41M16.95 16.95l1.41 1.41M3 12h2M19 12h2M5.64 18.36l1.41-1.41M16.95 7.05l1.41-1.41M12 8a4 4 0 100 8 4 4 0 000-8z',
      disabled: !themeStore.isDark,
      action: () => themeStore.setMode('light')
    },
    {
      id: 'theme-dark',
      label: '深色模式',
      icon: 'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z',
      disabled: themeStore.isDark,
      action: () => themeStore.setMode('dark')
    },
    {
      id: 'theme-auto',
      label: '跟随系统',
      icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      disabled: themeStore.mode === 'auto',
      action: () => themeStore.setMode('auto')
    }
  ];

  const toolGroup: ContextMenuItem[] = [
    {
      id: 'fullscreen',
      label: document.fullscreenElement ? '退出全屏' : '全屏显示',
      icon: 'M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15',
      shortcut: 'F11',
      action: toggleFullscreen
    }
  ];

  return [navigationGroup, pageGroup, themeGroup, toolGroup];
});

const handleContextMenu = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.isContentEditable
  ) {
    return;
  }
  contextMenuRef.value?.open(event);
};

const toggleFullscreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
};

onMounted(() => {
  themeStore.init();
});
</script>

<style>
.app-root {
  width: 100%;
  min-height: 100vh;
  background: var(--color-bg);
  position: relative;
  transition: background-color 0.3s ease;
}
</style>