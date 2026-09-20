import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export type DockPosition = 'bottom' | 'top' | 'left' | 'right';
export type DockMode = 'always' | 'auto-hide';

const STORAGE_KEY = 'csl-settings';

interface SettingsData {
  dockPosition: DockPosition;
  dockMode: DockMode;
}

export const useSettingsStore = defineStore('settings', () => {
  const dockPosition = ref<DockPosition>('bottom');
  const dockMode = ref<DockMode>('always');

  const applyDockPosition = () => {
    const root = document.documentElement;
    root.setAttribute('data-dock-position', dockPosition.value);
    root.setAttribute('data-dock-mode', dockMode.value);
  };

  const setDockPosition = (position: DockPosition) => {
    dockPosition.value = position;
    applyDockPosition();
    persist();
  };

  const setDockMode = (mode: DockMode) => {
    dockMode.value = mode;
    applyDockPosition();
    persist();
  };

  const persist = () => {
    try {
      const data: SettingsData = {
        dockPosition: dockPosition.value,
        dockMode: dockMode.value
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore
    }
  };

  const load = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data: SettingsData = JSON.parse(raw);
        if (data.dockPosition) dockPosition.value = data.dockPosition;
        if (data.dockMode) dockMode.value = data.dockMode;
      }
    } catch {
      // ignore
    }
    applyDockPosition();
  };

  return {
    dockPosition,
    dockMode,
    setDockPosition,
    setDockMode,
    load
  };
});