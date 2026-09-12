import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export type ThemeMode = 'light' | 'dark' | 'auto';

const STORAGE_KEY = 'csl-theme-mode';

export const useThemeStore = defineStore('theme', () => {
  const mode = ref<ThemeMode>('auto');
  const isDark = ref(false);

  const getSystemDark = (): boolean => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const applyTheme = () => {
    const root = document.documentElement;

    if (mode.value === 'auto') {
      isDark.value = getSystemDark();
    } else {
      isDark.value = mode.value === 'dark';
    }

    root.setAttribute('data-theme', isDark.value ? 'dark' : 'light');
  };

  const setMode = (newMode: ThemeMode) => {
    mode.value = newMode;
    localStorage.setItem(STORAGE_KEY, newMode);
    applyTheme();
  };

  const toggle = () => {
    setMode(isDark.value ? 'light' : 'dark');
  };

  const init = () => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    if (saved && ['light', 'dark', 'auto'].includes(saved)) {
      mode.value = saved;
    }
    applyTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (mode.value === 'auto') {
        applyTheme();
      }
    };
    mediaQuery.addEventListener('change', handleChange);
  };

  watch(mode, applyTheme);

  return {
    mode,
    isDark,
    setMode,
    toggle,
    init
  };
});