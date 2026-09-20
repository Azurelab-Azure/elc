import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface CookieConsent {
  necessary: boolean;   // 必要 Cookie（不可关闭）
  analytics: boolean;   // 分析 Cookie
  preferences: boolean; // 偏好 Cookie
  timestamp: number;
}

const STORAGE_KEY = 'csl-cookie-consent';

export const useCookieStore = defineStore('cookie', () => {
  const consent = ref<CookieConsent | null>(null);
  const bannerVisible = ref(false);
  const settingsVisible = ref(false);

  const hasConsent = (): boolean => {
    return consent.value !== null;
  };

  const load = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        consent.value = JSON.parse(raw);
      }
    } catch {
      consent.value = null;
    }

    if (!consent.value) {
      bannerVisible.value = true;
    }
  };

  const acceptAll = () => {
    consent.value = {
      necessary: true,
      analytics: true,
      preferences: true,
      timestamp: Date.now()
    };
    persist();
    bannerVisible.value = false;
    settingsVisible.value = false;
  };

  const acceptNecessaryOnly = () => {
    consent.value = {
      necessary: true,
      analytics: false,
      preferences: false,
      timestamp: Date.now()
    };
    persist();
    bannerVisible.value = false;
    settingsVisible.value = false;
  };

  const saveCustom = (data: Omit<CookieConsent, 'timestamp' | 'necessary'>) => {
    consent.value = {
      necessary: true,
      analytics: data.analytics,
      preferences: data.preferences,
      timestamp: Date.now()
    };
    persist();
    bannerVisible.value = false;
    settingsVisible.value = false;
  };

  const persist = () => {
    if (consent.value) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent.value));
    }
  };

  const resetConsent = () => {
    localStorage.removeItem(STORAGE_KEY);
    consent.value = null;
    bannerVisible.value = true;
    settingsVisible.value = true;
  };

  const openSettings = () => {
    settingsVisible.value = true;
  };

  const closeSettings = () => {
    settingsVisible.value = false;
  };

  return {
    consent,
    bannerVisible,
    settingsVisible,
    load,
    hasConsent,
    acceptAll,
    acceptNecessaryOnly,
    saveCustom,
    resetConsent,
    openSettings,
    closeSettings
  };
});