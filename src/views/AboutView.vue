<template>
  <div class="page">
    <div class="about-card">
      <div class="about-logo">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      </div>

      <h1 class="about-title">电路仿真实验室</h1>
      <p class="about-subtitle">让电路学习变得直观易懂</p>

      <div class="section">
        <h2 class="section-title">项目介绍</h2>
        <p class="section-text">
          电路仿真实验室是一个开源的电路仿真与教学平台。所有数据来源于 beta 目录，规则来源于 rules 目录。
        </p>
      </div>

      <div class="section">
        <h2 class="section-title">数据统计</h2>
        <div class="stats-grid">
          <div class="stat-box">
            <div class="stat-value">{{ circuits.length }}</div>
            <div class="stat-label">电路文件</div>
          </div>
          <div class="stat-box">
            <div class="stat-value stat-purple">{{ documents.length }}</div>
            <div class="stat-label">文档资料</div>
          </div>
          <div class="stat-box">
            <div class="stat-value stat-green">{{ categories.length }}</div>
            <div class="stat-label">分类模块</div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">技术栈</h2>
        <div class="tech-list">
          <span v-for="tech in technologies" :key="tech" class="tech-chip">{{ tech }}</span>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">开源协议</h2>
        <p class="section-text">采用 MIT 开源许可证</p>
      </div>
    </div>

    <DockBar />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import DockBar from '../components/common/DockBar.vue';
import { useCatalog } from '../composables/useCatalog';

const { circuits, documents, categories, load } = useCatalog();

const technologies = ['Vue 3', 'TypeScript', 'Pinia', 'Vue Router', 'Vite', 'Three.js', 'Lottie', 'Electron', 'Vitest'];

onMounted(load);
</script>

<style scoped>
.about-card {
  max-width: 640px;
  margin: 0 auto;
  background: var(--bg-level-1);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-subtle);
  padding: 48px;
}

.about-logo {
  width: 68px;
  height: 68px;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, #0071e3 0%, #af52de 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.about-logo svg {
  width: 34px;
  height: 34px;
}

.about-title {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 6px;
  line-height: 1.15;
}

.about-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: 48px;
}

.section {
  margin-bottom: 36px;
}

.section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 14px;
}

.section-text {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.stat-box {
  padding: 18px;
  background: var(--bg-level-2);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  text-align: center;
}

.stat-value {
  font-size: 26px;
  font-weight: 700;
  color: var(--color-blue);
  letter-spacing: -0.03em;
  margin-bottom: 4px;
}

.stat-purple { color: var(--color-purple); }
.stat-green { color: var(--color-green); }

.stat-label {
  font-size: 12px;
  color: var(--text-secondary);
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tech-chip {
  padding: 6px 12px;
  background: var(--bg-level-2);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
}

@media (max-width: 640px) {
  .about-card {
    padding: 32px 24px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>