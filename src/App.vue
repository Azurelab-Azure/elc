<template>
  <div class="app-root" @contextmenu="handleContextMenu">
    <StaticBackground />

    <main class="app-main">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>

      <FooterBar />
    </main>

    <CookieBanner />
    <ContextMenu ref="contextMenuRef" :groups="menuGroups" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import StaticBackground from './components/common/StaticBackground.vue';
import ContextMenu, { type ContextMenuItem } from './components/common/ContextMenu.vue';
import { useThemeStore } from './store/themeStore';
import { useSettingsStore } from './store/settingsStore';
import CookieBanner from './components/common/CookieBanner.vue';
import { useCookieStore } from './store/cookieStore';
import FooterBar from './components/common/FooterBar.vue';


const cookieStore = useCookieStore();

onMounted(() => {
  themeStore.init();
  settingsStore.load();
  cookieStore.load();
});
const settingsStore = useSettingsStore();
const router = useRouter();
const themeStore = useThemeStore();
const contextMenuRef = ref<InstanceType<typeof ContextMenu> | null>(null);

  onMounted(() => {
  themeStore.init();
  settingsStore.load();
});

const menuGroups = computed<ContextMenuItem[][]>(() => {
  const navigationGroup: ContextMenuItem[] = [
    {
      id: 'home',
      label: '返回首页',
      icon: 'M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10',
      action: () => router.push('/')
    },
    {
      id: 'back',
      label: '返回上一页',
      icon: 'M15 19l-7-7 7-7',
      action: () => router.back()
    }
  ];

  const pageGroup: ContextMenuItem[] = [
    {
      id: 'refresh',
      label: '刷新页面',
      icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
      action: () => window.location.reload()
    },
    {
      id: 'copy',
      label: '复制链接',
      icon: 'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z',
      action: () => navigator.clipboard.writeText(window.location.href)
    }
  ];

  const themeGroup: ContextMenuItem[] = [
    {
      id: 'theme-light',
      label: '浅色模式',
      disabled: !themeStore.isDark,
      action: () => themeStore.setMode('light')
    },
    {
      id: 'theme-dark',
      label: '深色模式',
      disabled: themeStore.isDark,
      action: () => themeStore.setMode('dark')
    },
    {
      id: 'theme-auto',
      label: '跟随系统',
      disabled: themeStore.mode === 'auto',
      action: () => themeStore.setMode('auto')
    }
  ];

  return [navigationGroup, pageGroup, themeGroup];
});

const handleContextMenu = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
    return;
  }
  contextMenuRef.value?.open(event);
};

onMounted(() => {
  themeStore.init();
});
</script>

<style>
.app-root {
  width: 100%;
  min-height: 100vh;
  background: var(--bg-level-0);
  position: relative;
  transition: background-color 0.3s ease;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}


.app-main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}
</style>