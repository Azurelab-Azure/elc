import { ref, onMounted, onUnmounted } from 'vue';

export interface MenuAction {
  id: string;
  label: string;
  icon?: string;
  shortcut?: string;
  danger?: boolean;
  disabled?: boolean;
  action: () => void;
}

export function useContextMenu() {
  const groups = ref<MenuAction[][]>([]);
  const enabled = ref(true);

  const setMenu = (newGroups: MenuAction[][]) => {
    groups.value = newGroups;
  };

  const enable = () => {
    enabled.value = true;
  };

  const disable = () => {
    enabled.value = false;
  };

  return {
    groups,
    enabled,
    setMenu,
    enable,
    disable
  };
}