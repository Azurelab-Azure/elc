<template>
  <div class="page">
    <header class="page-header">
      <div class="header-icon" :style="{ background: 'linear-gradient(135deg, #ff9500, #ff9f0a)' }">
        <AppIcon name="about" :size="28" />
      </div>
      <h1 class="page-title">关于</h1>
      <p class="page-desc">电路仿真实验室</p>
    </header>

    <div class="about-grid">
      <div class="about-card glass about-hero">
        <div class="about-logo">
          <AppIcon name="lightning" :size="40" />
        </div>
        <h2 class="about-title">电路仿真实验室</h2>
        <p class="about-desc">开源的电路仿真与教学平台</p>
      </div>

      <div class="about-card glass">
        <h3 class="card-title">项目介绍</h3>
        <p class="card-text">
          电路仿真实验室是一个开源的电路仿真与教学平台。所有数据来源于 beta 目录，无需后端服务即可运行。
        </p>
      </div>

      <div class="about-card glass">
        <h3 class="card-title">数据统计</h3>
        <div class="stat-list">
          <div class="stat-row">
            <span class="stat-name">教学文档</span>
            <span class="stat-num">{{ counts.teaching }}</span>
          </div>
          <div class="stat-row">
            <span class="stat-name">仿真电路</span>
            <span class="stat-num">{{ counts.simulation }}</span>
          </div>
          <div class="stat-row">
            <span class="stat-name">电路图</span>
            <span class="stat-num">{{ counts.circuits }}</span>
          </div>
        </div>
      </div>

      <div class="about-card glass">
        <h3 class="card-title">技术栈</h3>
        <div class="tech-list">
          <span v-for="tech in technologies" :key="tech" class="tech-chip">{{ tech }}</span>
        </div>
      </div>

      <div class="about-card glass">
        <h3 class="card-title">开源协议</h3>
        <p class="card-text">采用 MIT 开源许可证</p>
      </div>
    </div>

    <DockBar />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import DockBar from '../components/common/DockBar.vue';
import AppIcon from '../components/common/AppIcon.vue';
import { useCatalog } from '../composables/useCatalog';

const { teaching, simulation, circuits, load } = useCatalog();

const counts = computed(() => ({
  teaching: teaching.value.length,
  simulation: simulation.value.length,
  circuits: circuits.value.length
}));

const technologies = [
  'Vue 3',
  'TypeScript',
  'Pinia',
  'Vue Router',
  'Vite',
  'Three.js',
  'Tailwind CSS',
  'Electron'
];

onMounted(load);
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

.about-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.about-card {
  padding: 40px;
}

.about-hero {
  grid-column: 1 / -1;
  text-align: center;
}

.about-logo {
  width: 88px;
  height: 88px;
  border-radius: var(--radius-xl);
  background: linear-gradient(135deg, #0071e3 0%, #af52de 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  color: white;
  box-shadow:
    0 20px 50px rgba(0, 113, 227, 0.35),
    0 0 0 1px rgba(255, 255, 255, 0.15) inset;
}

.about-title {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.035em;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.about-desc {
  font-size: 16px;
  color: var(--text-secondary);
  font-weight: 500;
}

.card-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 20px;
}

.card-text {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.stat-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-subtle);
}

.stat-row:last-child {
  border-bottom: none;
}

.stat-name {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
}

.stat-num {
  font-size: 22px;
  font-weight: 800;
  color: var(--color-blue);
  letter-spacing: -0.03em;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-chip {
  padding: 8px 14px;
  background: var(--glass-bg-weak);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
}
</style>