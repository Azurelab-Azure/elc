<template>
  <Teleport to="body">
    <Transition name="announce">
      <div v-if="visible" class="announce-overlay" @click.self="handleClose">
        <div class="announce-modal">
          <button class="announce-close" @click="handleClose" aria-label="关闭">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <div class="announce-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
            </svg>
          </div>

          <h2 class="announce-title">{{ title }}</h2>

          <div class="announce-body">
            <p v-for="(line, i) in lines" :key="i" class="announce-line">{{ line }}</p>
          </div>

          <div v-if="actions && actions.length" class="announce-actions">
            <button
              v-for="(action, i) in actions"
              :key="i"
              class="announce-btn"
              :class="action.primary ? 'announce-btn-primary' : 'announce-btn-secondary'"
              @click="handleAction(action)"
            >
              {{ action.label }}
            </button>
          </div>

          <label class="announce-skip">
            <input v-model="dontShowAgain" type="checkbox" />
            <span>今日不再显示</span>
          </label>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

export interface AnnounceAction {
  label: string;
  primary?: boolean;
  onClick?: () => void;
}

const props = withDefaults(defineProps<{
  title?: string;
  lines?: string[];
  actions?: AnnounceAction[];
  storageKey?: string;
  delay?: number;
  version?: string;
}>(), {
  title: '公告',
  lines: () => [],
  actions: () => [],
  storageKey: 'csl-announcement',
  delay: 800,
  version: 'v1'
});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'action', action: AnnounceAction): void;
}>();

const visible = ref(false);
const dontShowAgain = ref(false);

const todayKey = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const storageKeyWithVersion = () => `${props.storageKey}:${props.version}`;

const shouldShow = (): boolean => {
  try {
    const raw = localStorage.getItem(storageKeyWithVersion());
    if (!raw) return true;
    const data = JSON.parse(raw);
    if (data.date === todayKey()) return false;
    return true;
  } catch {
    return true;
  }
};

const markShown = () => {
  if (!dontShowAgain.value) return;
  try {
    localStorage.setItem(storageKeyWithVersion(), JSON.stringify({
      date: todayKey(),
      version: props.version
    }));
  } catch {
    // ignore
  }
};

const handleClose = () => {
  markShown();
  visible.value = false;
  emit('close');
};

const handleAction = (action: AnnounceAction) => {
  if (action.onClick) action.onClick();
  emit('action', action);
  if (action.primary) {
    handleClose();
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && visible.value) {
    handleClose();
  }
};

onMounted(() => {
  if (!shouldShow()) return;

  setTimeout(() => {
    visible.value = true;
    document.addEventListener('keydown', handleKeydown);
  }, props.delay);
});
</script>

<style scoped>
.announce-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: saturate(180%) blur(8px);
  -webkit-backdrop-filter: saturate(180%) blur(8px);
}

.announce-modal {
  position: relative;
  width: 100%;
  max-width: 440px;
  padding: 40px 32px 32px;
  background: var(--bg-level-1);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
  text-align: center;
}

.announce-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: var(--text-tertiary);
  transition: all 0.2s ease;
}

.announce-close:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.announce-close svg {
  width: 18px;
  height: 18px;
}

.announce-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--color-blue-soft);
  color: var(--color-blue);
}

.announce-icon svg {
  width: 32px;
  height: 32px;
}

.announce-title {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--text-primary);
  margin-bottom: 16px;
  line-height: 1.2;
}

.announce-body {
  margin-bottom: 24px;
}

.announce-line {
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 6px;
}

.announce-line:last-child {
  margin-bottom: 0;
}

.announce-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.announce-btn {
  padding: 11px 24px;
  border-radius: var(--radius-pill);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.01em;
  transition: all 0.2s ease;
}

.announce-btn-primary {
  background: var(--color-blue);
  color: white;
}

.announce-btn-primary:hover {
  background: var(--color-blue-hover);
}

.announce-btn-secondary {
  background: var(--bg-level-2);
  color: var(--text-primary);
  border: 1px solid var(--border-default);
}

.announce-btn-secondary:hover {
  background: var(--bg-hover);
}

.announce-skip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-tertiary);
  cursor: pointer;
  user-select: none;
}

.announce-skip input {
  cursor: pointer;
  accent-color: var(--color-blue);
}

.announce-enter-active,
.announce-leave-active {
  transition: opacity 0.25s ease;
}

.announce-enter-active .announce-modal,
.announce-leave-active .announce-modal {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease;
}

.announce-enter-from,
.announce-leave-to {
  opacity: 0;
}

.announce-enter-from .announce-modal,
.announce-leave-to .announce-modal {
  transform: scale(0.94) translateY(10px);
  opacity: 0;
}

@media (max-width: 480px) {
  .announce-modal {
    padding: 32px 24px 24px;
    border-radius: var(--radius-xl);
  }

  .announce-title {
    font-size: 19px;
  }

  .announce-line {
    font-size: 14px;
  }
}
</style>