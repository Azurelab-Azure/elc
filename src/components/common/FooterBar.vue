<template>
  <footer class="footer-bar" :class="{ 'footer-bar-dock-hidden': isDockAtBottom }">
    <div class="footer-inner">
      <p class="footer-text">
        <span>{{ copyright }}</span>
        <span class="footer-sep">·</span>
        <span>{{ icpText }}</span>
        <span class="footer-sep">·</span>
        <a
          v-if="policeNumber"
          :href="policeUrl"
          target="_blank"
          rel="noopener"
          class="footer-link"
        >
          {{ policeNumber }}
        </a>
         <span v-else class="footer-muted"></span> 
      </p>

      <p class="footer-sub">
        <span class="footer-muted">MIT License</span>
        <span class="footer-sep">·</span>
        <span class="footer-muted">仅供学习参考</span>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSettingsStore } from '../../store/settingsStore';

const settings = useSettingsStore();

/**
 * 备案信息配置
 * ------------------------------------------------
 * 上线后修改以下字段即可自动展示：
 *
 *   icpText        工信部备案号，如 "浙ICP备12345678号"
 *   icpUrl         工信部备案查询链接（可选）
 *   policeNumber   公安网备案号，如 "浙公网安备33010000000000号"
 *   policeUrl      公安网备案链接（可选）
 *   copyright      版权信息
 *
 * 未填写时显示占位文本，不影响页面。
 */
const icpText = '26H2'
const icpUrl = ''
const policeNumber = ''
const policeUrl = ''
const copyright = computed(() => `© ${new Date().getFullYear()} Azure_Lab`)

// Dock 栏在底部时，footer 隐藏，避免遮挡
const isDockAtBottom = computed(() => settings.dockPosition === 'bottom')
</script>

<style scoped>
.footer-bar {
  width: 100%;
  padding: 32px 24px 40px;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
  transition: padding 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Dock 在底部时，footer 也留出空间 */
.footer-bar-dock-hidden {
  padding-bottom: 40px;
}

.footer-inner {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}

.footer-text {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-tertiary);
  letter-spacing: -0.01em;
  line-height: 1.6;
}

.footer-sub {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
  font-size: 11px;
  letter-spacing: -0.01em;
  line-height: 1.5;
}

.footer-sep {
  color: var(--text-quaternary);
  opacity: 0.6;
}

.footer-muted {
  color: var(--text-quaternary);
}

.footer-link {
  color: var(--text-tertiary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: var(--color-blue);
  opacity: 1;
}

/* 侧边 Dock 时，footer 需要根据位置调整 padding */
:root[data-dock-position='left'] .footer-bar {
  padding-left: 160px;
}

:root[data-dock-position='right'] .footer-bar {
  padding-right: 160px;
}

:root[data-dock-position='left'][data-dock-mode='auto-hide'] .footer-bar {
  padding-left: 40px;
}

:root[data-dock-position='right'][data-dock-mode='auto-hide'] .footer-bar {
  padding-right: 40px;
}

@media (max-width: 640px) {
  .footer-bar {
    padding: 24px 16px 32px;
  }

  :root[data-dock-position='left'] .footer-bar {
    padding-left: 40px;
  }

  :root[data-dock-position='right'] .footer-bar {
    padding-right: 40px;
  }

  .footer-text,
  .footer-sub {
    font-size: 11px;
  }
}
</style>