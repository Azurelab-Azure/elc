<template>
  <Teleport to="body">
    <Transition name="context-menu">
      <div
        v-if="visible"
        ref="menuRef"
        class="context-menu"
        :style="{ left: position.x + 'px', top: position.y + 'px' }"
        @click.stop
        @contextmenu.prevent
      >
        <template v-for="(group, gi) in groups" :key="gi">
          <div v-if="gi > 0" class="menu-divider"></div>
          <button
            v-for="item in group"
            :key="item.id"
            class="menu-item"
            :class="{ 'menu-item-danger': item.danger, 'menu-item-disabled': item.disabled }"
            :disabled="item.disabled"
            @click="handleClick(item)"
          >
            <svg v-if="item.icon" class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path :d="item.icon" />
            </svg>
            <span class="menu-label">{{ item.label }}</span>
            <span v-if="item.shortcut" class="menu-shortcut">{{ item.shortcut }}</span>
          </button>
        </template>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue';

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: string;
  shortcut?: string;
  danger?: boolean;
  disabled?: boolean;
  action?: () => void;
}

const props = defineProps<{
  groups: ContextMenuItem[][];
}>();

const menuRef = ref<HTMLElement | null>(null);
const visible = ref(false);
const position = ref({ x: 0, y: 0 });

const open = (event: MouseEvent) => {
  event.preventDefault();

  visible.value = true;
  position.value = { x: event.clientX, y: event.clientY };

  nextTick(() => {
    adjustPosition();
  });
};

const adjustPosition = () => {
  if (!menuRef.value) return;

  const rect = menuRef.value.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let x = position.value.x;
  let y = position.value.y;

  if (x + rect.width > vw - 8) {
    x = vw - rect.width - 8;
  }

  if (y + rect.height > vh - 8) {
    y = vh - rect.height - 8;
  }

  if (x < 8) x = 8;
  if (y < 8) y = 8;

  position.value = { x, y };
};

const close = () => {
  visible.value = false;
};

const handleClick = (item: ContextMenuItem) => {
  if (item.disabled) return;
  if (item.action) item.action();
  close();
};

const handleGlobalClick = () => {
  if (visible.value) close();
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && visible.value) {
    close();
  }
};

onMounted(() => {
  document.addEventListener('click', handleGlobalClick);
  document.addEventListener('contextmenu', handleGlobalClick);
  document.addEventListener('keydown', handleKeydown);
  window.addEventListener('resize', close);
  window.addEventListener('scroll', close, true);
});

onUnmounted(() => {
  document.removeEventListener('click', handleGlobalClick);
  document.removeEventListener('contextmenu', handleGlobalClick);
  document.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('resize', close);
  window.removeEventListener('scroll', close, true);
});

watch(visible, (val) => {
  if (val) {
    nextTick(adjustPosition);
  }
});

defineExpose({ open, close });
</script>

<style scoped>
.context-menu {
  position: fixed;
  z-index: 9999;
  min-width: 200px;
  padding: 6px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border: 0.5px solid rgba(0, 0, 0, 0.08);
  border-radius: 14px;
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.08),
    0 16px 48px rgba(0, 0, 0, 0.12);
  user-select: none;
}

.menu-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #1d1d1f;
  text-align: left;
  letter-spacing: -0.01em;
  transition: background 0.12s ease;
  gap: 10px;
}

.menu-item:hover:not(.menu-item-disabled) {
  background: rgba(0, 113, 227, 0.08);
  color: #0071e3;
}

.menu-item-danger {
  color: #ff3b30;
}

.menu-item-danger:hover:not(.menu-item-disabled) {
  background: rgba(255, 59, 48, 0.08);
  color: #ff3b30;
}

.menu-item-disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.menu-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.menu-label {
  flex: 1;
}

.menu-shortcut {
  font-size: 11px;
  font-family: var(--font-mono);
  color: #86868b;
  letter-spacing: 0.02em;
}

.menu-divider {
  height: 1px;
  margin: 4px 8px;
  background: rgba(0, 0, 0, 0.06);
}

.context-menu-enter-active,
.context-menu-leave-active {
  transition: opacity 0.12s ease, transform 0.12s ease;
  transform-origin: top left;
}

.context-menu-enter-from,
.context-menu-leave-to {
  opacity: 0;
  transform: scale(0.94);
}


</style>