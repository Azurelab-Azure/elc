<template>
  <Teleport to="body">
    <Transition name="cookie">
      <div v-if="cookieStore.bannerVisible" class="cookie-banner">
        <div class="cookie-inner glass-strong">
          <div class="cookie-icon">
            <AppIcon name="cookie" :size="24" />
          </div>
          <div class="cookie-content">
            <h3 class="cookie-title">我们使用 Cookie</h3>
            <p class="cookie-desc">
              本站使用 Cookie 来提升使用体验、分析访问情况。您可以选择接受全部，或仅保留必要 Cookie。
              <button class="cookie-link" @click="openPrivacy">隐私政策</button>
            </p>
          </div>
          <div class="cookie-actions">
            <button class="cookie-btn cookie-btn-ghost" @click="openSettings">
              自定义
            </button>
            <button class="cookie-btn cookie-btn-ghost" @click="cookieStore.acceptNecessaryOnly">
              仅必要
            </button>
            <button class="cookie-btn cookie-btn-primary" @click="cookieStore.acceptAll">
              接受全部
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 自定义设置弹窗 -->
    <Transition name="cookie-modal">
      <div v-if="cookieStore.settingsVisible" class="cookie-overlay" @click.self="cookieStore.closeSettings">
        <div class="cookie-modal glass-strong">
          <div class="modal-header">
            <h3 class="modal-title">Cookie 设置</h3>
            <button class="modal-close" @click="cookieStore.closeSettings">
              <AppIcon name="close" :size="18" />
            </button>
          </div>

          <div class="modal-body">
            <div class="cookie-option">
              <div class="option-info">
                <h4 class="option-title">必要 Cookie</h4>
                <p class="option-desc">网站运行所必需，无法关闭。</p>
              </div>
              <div class="option-switch option-switch-locked">
                <div class="switch-track switch-track-on">
                  <div class="switch-thumb"></div>
                </div>
              </div>
            </div>

            <div class="cookie-option">
              <div class="option-info">
                <h4 class="option-title">分析 Cookie</h4>
                <p class="option-desc">用于统计访问量，帮助我们改善体验。</p>
              </div>
              <button
                class="option-switch"
                @click="analytics = !analytics"
              >
                <div class="switch-track" :class="{ 'switch-track-on': analytics }">
                  <div class="switch-thumb"></div>
                </div>
              </button>
            </div>

            <div class="cookie-option">
              <div class="option-info">
                <h4 class="option-title">偏好 Cookie</h4>
                <p class="option-desc">记住您的主题、Dock 位置等设置。</p>
              </div>
              <button
                class="option-switch"
                @click="preferences = !preferences"
              >
                <div class="switch-track" :class="{ 'switch-track-on': preferences }">
                  <div class="switch-thumb"></div>
                </div>
              </button>
            </div>
          </div>

          <div class="modal-footer">
            <button class="cookie-btn cookie-btn-ghost" @click="cookieStore.acceptNecessaryOnly">
              仅必要
            </button>
            <button class="cookie-btn cookie-btn-primary" @click="save">
              保存设置
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import AppIcon from './AppIcon.vue';
import { useCookieStore } from '../../store/cookieStore';

const cookieStore = useCookieStore();

const analytics = ref(cookieStore.consent?.analytics ?? true);
const preferences = ref(cookieStore.consent?.preferences ?? true);

watch(
  () => cookieStore.settingsVisible,
  (visible) => {
    if (visible) {
      analytics.value = cookieStore.consent?.analytics ?? true;
      preferences.value = cookieStore.consent?.preferences ?? true;
    }
  }
);

const save = () => {
  cookieStore.saveCustom({
    analytics: analytics.value,
    preferences: preferences.value
  });
};

const openPrivacy = () => {
  window.open('/legal/privacy.html', '_blank');
};
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9998;
  padding: 20px;
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.cookie-inner {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 24px;
  border-radius: var(--radius-2xl);
  max-width: 1000px;
  width: 100%;
  pointer-events: auto;
}

.cookie-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, #ff9500, #ff9f0a);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 8px 20px rgba(255, 149, 0, 0.3);
}

.cookie-content {
  flex: 1;
  min-width: 0;
}

.cookie-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  margin-bottom: 4px;
}

.cookie-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.cookie-link {
  color: var(--color-blue);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;
  background: none;
  padding: 0;
  font-size: inherit;
}

.cookie-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.cookie-btn {
  padding: 10px 20px;
  border-radius: var(--radius-pill);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.01em;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.cookie-btn-ghost {
  background: var(--bg-level-2);
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
}

.cookie-btn-ghost:hover {
  background: var(--bg-hover);
  border-color: var(--border-default);
}

.cookie-btn-primary {
  background: var(--color-blue);
  color: white;
  box-shadow: 0 6px 16px rgba(0, 113, 227, 0.25);
}

.cookie-btn-primary:hover {
  background: var(--color-blue-hover);
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(0, 113, 227, 0.35);
}

/* 自定义设置弹窗 */
.cookie-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.cookie-modal {
  width: 100%;
  max-width: 520px;
  border-radius: var(--radius-2xl);
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 28px;
  border-bottom: 1px solid var(--border-subtle);
}

.modal-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.modal-close {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-tertiary);
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.modal-body {
  padding: 20px 28px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cookie-option {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px 0;
  border-bottom: 1px solid var(--border-subtle);
}

.cookie-option:last-child {
  border-bottom: none;
}

.option-info {
  flex: 1;
}

.option-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.option-desc {
  font-size: 12px;
  color: var(--text-tertiary);
  line-height: 1.5;
}

.option-switch {
  flex-shrink: 0;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
}

.option-switch-locked {
  cursor: default;
}

.switch-track {
  width: 44px;
  height: 26px;
  border-radius: 13px;
  background: var(--bg-level-3);
  border: 1px solid var(--border-default);
  position: relative;
  transition: all 0.25s ease;
}

.switch-track-on {
  background: var(--color-blue);
  border-color: var(--color-blue);
}

.switch-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: transform 0.25s cubic-bezier(0.32, 0.72, 0, 1);
}

.switch-track-on .switch-thumb {
  transform: translateX(18px);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px 28px;
  border-top: 1px solid var(--border-subtle);
}

/* 动画 */
.cookie-enter-active,
.cookie-leave-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
}

.cookie-enter-from,
.cookie-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.cookie-modal-enter-active,
.cookie-modal-leave-active {
  transition: opacity 0.25s ease;
}

.cookie-modal-enter-from,
.cookie-modal-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .cookie-inner {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .cookie-icon {
    width: 40px;
    height: 40px;
  }

  .cookie-actions {
    flex-wrap: wrap;
  }

  .cookie-btn {
    flex: 1;
    min-width: 100px;
  }
}
</style>