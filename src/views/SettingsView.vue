<template>
  <div class="page">
    <header class="page-header">
      <div class="header-icon" :style="{ background: 'linear-gradient(135deg, #ff9500, #ff9f0a)' }">
        <AppIcon name="settings" :size="28" />
      </div>
      <h1 class="page-title">设置</h1>
      <p class="page-desc">个性化您的使用体验</p>
    </header>

    <div class="settings-grid">
      <!-- Dock 栏位置 -->
      <section class="setting-card glass">
        <div class="card-header">
          <div class="card-icon" style="background: linear-gradient(135deg, #0071e3, #0a84ff)">
            <AppIcon name="layout" :size="20" />
          </div>
          <div>
            <h2 class="card-title">任务栏位置</h2>
            <p class="card-desc">调整底部导航栏的显示位置</p>
          </div>
        </div>

        <div class="position-grid">
          <button
            v-for="pos in positions"
            :key="pos.value"
            class="position-btn"
            :class="{ 'position-btn-active': settings.dockPosition === pos.value }"
            @click="settings.setDockPosition(pos.value)"
          >
            <div class="position-preview" :class="`preview-${pos.value}`">
              <div class="preview-screen"></div>
              <div class="preview-dock"></div>
            </div>
            <span class="position-label">{{ pos.label }}</span>
          </button>
        </div>
      </section>

      <!-- Dock 栏显示模式 -->
      <section class="setting-card glass">
        <div class="card-header">
          <div class="card-icon" style="background: linear-gradient(135deg, #af52de, #bf5af2)">
            <AppIcon name="eye" :size="20" />
          </div>
          <div>
            <h2 class="card-title">显示模式</h2>
            <p class="card-desc">任务栏是否自动隐藏</p>
          </div>
        </div>

        <div class="mode-list">
          <button
            v-for="mode in modes"
            :key="mode.value"
            class="mode-btn"
            :class="{ 'mode-btn-active': settings.dockMode === mode.value }"
            @click="settings.setDockMode(mode.value)"
          >
            <div class="mode-icon">
              <AppIcon :name="mode.icon" :size="20" />
            </div>
            <div class="mode-info">
              <span class="mode-label">{{ mode.label }}</span>
              <span class="mode-desc">{{ mode.desc }}</span>
            </div>
            <div class="mode-check" :class="{ 'mode-check-active': settings.dockMode === mode.value }">
              <AppIcon v-if="settings.dockMode === mode.value" name="check" :size="14" />
            </div>
          </button>
        </div>
      </section>

      <!-- 主题模式 -->
      <section class="setting-card glass">
        <div class="card-header">
          <div class="card-icon" style="background: linear-gradient(135deg, #34c759, #30d158)">
            <AppIcon :name="themeStore.isDark ? 'moon' : 'sun'" :size="20" />
          </div>
          <div>
            <h2 class="card-title">主题外观</h2>
            <p class="card-desc">切换浅色或深色模式</p>
          </div>
        </div>

        <div class="theme-list">
          <button
            v-for="theme in themes"
            :key="theme.value"
            class="theme-btn"
            :class="{ 'theme-btn-active': themeStore.mode === theme.value }"
            @click="themeStore.setMode(theme.value)"
          >
            <div class="theme-preview" :class="`theme-preview-${theme.value}`">
              <div class="theme-bar"></div>
              <div class="theme-bar theme-bar-short"></div>
              <div class="theme-bar"></div>
            </div>
            <div class="theme-info">
              <span class="theme-label">{{ theme.label }}</span>
            </div>
            <div class="mode-check" :class="{ 'mode-check-active': themeStore.mode === theme.value }">
              <AppIcon v-if="themeStore.mode === theme.value" name="check" :size="14" />
            </div>
          </button>
        </div>
      </section>


            <!-- 临时入口 -->
      <section class="setting-card glass">
        <div class="card-header">
          <div class="card-icon" style="background: linear-gradient(135deg, #5856d6, #5e5ce6)">
            <AppIcon name="link" :size="20" />
          </div>
          <div>
            <h2 class="card-title">临时入口</h2>
            <p class="card-desc">访问个人博客与导航</p>
          </div>
        </div>

        <div class="portal-list">
          <button class="portal-btn" @click="goBlog">
            <div class="portal-icon">
              <AppIcon name="globe" :size="18" />
            </div>
            <div class="portal-info">
              <span class="portal-label">个人博客</span>
              <span class="portal-desc">寅虎青蛟 Azure · 电路与自动化笔记</span>
            </div>
            <AppIcon name="arrowRight" :size="16" class="portal-arrow" />
          </button>

          <button class="portal-btn" @click="goPortal">
            <div class="portal-icon">
              <AppIcon name="layout" :size="18" />
            </div>
            <div class="portal-info">
              <span class="portal-label">站点导览</span>
              <span class="portal-desc">查看本实验室所有入口</span>
            </div>
            <AppIcon name="arrowRight" :size="16" class="portal-arrow" />
          </button>
        </div>
      </section>


            <!-- 关于 -->
      <section class="setting-card glass">
        <div class="card-header">
          <div class="card-icon" style="background: linear-gradient(135deg, #ff9500, #ff9f0a)">
            <AppIcon name="about" :size="20" />
          </div>
          <div>
            <h2 class="card-title">关于</h2>
            <p class="card-desc">电路仿真实验室</p>
          </div>
        </div>

        <div class="about-list">
          <div class="about-row">
            <span class="about-label">版本</span>
            <span class="about-value">v2.0.0</span>
          </div>
          <div class="about-row">
            <span class="about-label">开源协议</span>
            <span class="about-value">MIT License</span>
          </div>
        </div>

        <div class="legal-links">
          <button class="legal-btn" @click="openPrivacy">
            <span>隐私政策</span>
            <AppIcon name="arrowRight" :size="14" />
          </button>
          <button class="legal-btn" @click="openCookiePolicy">
            <span>Cookie 政策</span>
            <AppIcon name="arrowRight" :size="14" />
          </button>
          <button class="legal-btn" @click="openCookieSettings">
            <span>Cookie 设置</span>
            <AppIcon name="arrowRight" :size="14" />
          </button>
        </div>
      </section>
    </div>

    <DockBar />
  </div>
</template>

<script setup lang="ts">
import DockBar from '../components/common/DockBar.vue';
import AppIcon from '../components/common/AppIcon.vue';
import { useSettingsStore, type DockPosition, type DockMode } from '../store/settingsStore';
import { useThemeStore, type ThemeMode } from '../store/themeStore';
import { useCookieStore } from '../store/cookieStore';

const goPortal = () => {
  window.open('/portal.html', '_blank');
};
const cookieStore = useCookieStore();

const openPrivacy = () => {
  window.open('/legal/privacy.html', '_blank');
};

const openCookiePolicy = () => {
  window.open('/legal/cookie.html', '_blank');
};

const openCookieSettings = () => {
  cookieStore.resetConsent();
};
const settings = useSettingsStore();
const themeStore = useThemeStore();

const positions: Array<{ value: DockPosition; label: string }> = [
  { value: 'top', label: '顶部' },
  { value: 'bottom', label: '底部' },
  { value: 'left', label: '左侧' },
  { value: 'right', label: '右侧' }
];

const modes: Array<{ value: DockMode; label: string; desc: string; icon: 'eye' | 'eyeOff' }> = [
  {
    value: 'always',
    label: '始终显示',
    desc: '任务栏保持可见',
    icon: 'eye'
  },
  {
    value: 'auto-hide',
    label: '自动隐藏',
    desc: '鼠标靠近时显示',
    icon: 'eyeOff'
  }
];

const themes: Array<{ value: ThemeMode; label: string }> = [
  { value: 'light', label: '浅色' },
  { value: 'dark', label: '深色' },
  { value: 'auto', label: '跟随系统' }
];
</script>

<style scoped>
.page-header {
  margin-bottom: 60px;
}

.header-icon {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 24px;
  box-shadow:
    0 12px 32px rgba(255, 149, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.setting-card {
  padding: 32px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
}

.card-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  margin-bottom: 2px;
}

.card-desc {
  font-size: 13px;
  color: var(--text-tertiary);
}

/* 位置选择 */
.position-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.position-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 16px;
  background: var(--bg-level-2);
  border: 1.5px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  transition: all 0.25s ease;
}

.position-btn:hover {
  border-color: var(--border-default);
  background: var(--bg-hover);
}

.position-btn-active {
  border-color: var(--color-blue);
  background: var(--color-blue-soft);
}

.position-preview {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  background: var(--bg-level-1);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  overflow: hidden;
}

.preview-screen {
  position: absolute;
  inset: 6px;
  background: var(--bg-level-3);
  border-radius: 4px;
}

.preview-dock {
  position: absolute;
  background: var(--color-blue);
  border-radius: 3px;
  transition: all 0.3s ease;
}

/* 预览位置 */
.preview-top .preview-dock {
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
  height: 6px;
}

.preview-bottom .preview-dock {
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
  height: 6px;
}

.preview-left .preview-dock {
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  height: 40%;
  width: 6px;
}

.preview-right .preview-dock {
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  height: 40%;
  width: 6px;
}

.position-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
}

.position-btn-active .position-label {
  color: var(--color-blue);
}

/* 模式选择 */
.mode-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mode-btn {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  background: var(--bg-level-2);
  border: 1.5px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  transition: all 0.25s ease;
  text-align: left;
}

.mode-btn:hover {
  border-color: var(--border-default);
  background: var(--bg-hover);
}

.mode-btn-active {
  border-color: var(--color-blue);
  background: var(--color-blue-soft);
}

.mode-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  background: var(--glass-bg-weak);
  border: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.mode-btn-active .mode-icon {
  color: var(--color-blue);
}

.mode-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.mode-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.mode-desc {
  font-size: 12px;
  color: var(--text-tertiary);
}

.mode-check {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1.5px solid var(--border-default);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.mode-check-active {
  background: var(--color-blue);
  border-color: var(--color-blue);
}

/* 主题选择 */
.theme-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.theme-btn {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  background: var(--bg-level-2);
  border: 1.5px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  transition: all 0.25s ease;
  text-align: left;
}

.theme-btn:hover {
  border-color: var(--border-default);
  background: var(--bg-hover);
}

.theme-btn-active {
  border-color: var(--color-blue);
  background: var(--color-blue-soft);
}

.theme-preview {
  width: 48px;
  height: 36px;
  border-radius: var(--radius-md);
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-shrink: 0;
  border: 1px solid var(--border-subtle);
}

.theme-preview-light {
  background: #f5f5f7;
}

.theme-preview-dark {
  background: #1c1c1e;
}

.theme-preview-auto {
  background: linear-gradient(135deg, #f5f5f7 50%, #1c1c1e 50%);
}

.theme-bar {
  height: 4px;
  border-radius: 2px;
}

.theme-preview-light .theme-bar {
  background: #d1d1d6;
}

.theme-preview-dark .theme-bar {
  background: #48484a;
}

.theme-preview-auto .theme-bar {
  background: #a1a1a6;
}

.theme-bar-short {
  width: 60%;
}

.theme-info {
  flex: 1;
}

.theme-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

/* 关于 */
.about-list {
  display: flex;
  flex-direction: column;
}

.about-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid var(--border-subtle);
}

.about-row:last-child {
  border-bottom: none;
}

.about-label {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
}

.about-value {
  font-size: 14px;
  color: var(--text-primary);
  font-weight: 600;
  font-family: var(--font-mono);
}

.about-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: var(--color-blue);
  font-weight: 600;
}

@media (max-width: 768px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
}

.legal-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--border-subtle);
}

.legal-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: var(--bg-level-2);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  transition: all 0.2s ease;
  text-align: left;
}

.legal-btn:hover {
  background: var(--bg-hover);
  border-color: var(--border-default);
}

.legal-btn:hover :deep(.app-icon) {
  color: var(--color-blue);
  transform: translateX(2px);
}

.legal-btn :deep(.app-icon) {
  color: var(--text-tertiary);
  transition: all 0.2s ease;
}

.portal-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.portal-btn {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: var(--bg-level-2);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;
}

.portal-btn:hover {
  background: var(--bg-hover);
  border-color: var(--border-default);
}

.portal-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  background: var(--glass-bg-weak);
  border: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.portal-btn:hover .portal-icon {
  color: var(--color-blue);
}

.portal-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.portal-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.portal-desc {
  font-size: 12px;
  color: var(--text-tertiary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.portal-arrow {
  color: var(--text-tertiary);
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.portal-btn:hover .portal-arrow {
  color: var(--color-blue);
  transform: translateX(3px);
}
</style>