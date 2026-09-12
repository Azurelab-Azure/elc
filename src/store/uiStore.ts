import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUiStore = defineStore('ui', () => {
  const isDarkMode = ref(false);
  const isSidebarOpen = ref(false);
  const toasts = ref<Array<{
    id: number;
    type: 'success' | 'error' | 'info';
    message: string;
  }>>([]);
  let toastId = 0;

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
  };

  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = ++toastId;
    toasts.value.push({ id, type, message });

    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter(t => t.id !== id);
  };

  return {
    isDarkMode,
    isSidebarOpen,
    toasts,
    toggleDarkMode,
    toggleSidebar,
    showToast,
    removeToast
  };
});