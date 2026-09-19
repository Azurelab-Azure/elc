<template>
  <div class="page">
    <header class="page-header">
      <div class="header-icon" :style="{ background: 'linear-gradient(135deg, #af52de, #bf5af2)' }">
        <AppIcon name="simulation" :size="28" />
      </div>
      <h1 class="page-title">电路仿真</h1>
      <p class="page-desc">实时仿真与波形测量</p>
    </header>

    <div v-if="loading" class="state-loading">
      <div class="spinner"></div>
    </div>

    <div v-else-if="simulation.length === 0" class="empty glass">
      <div class="empty-icon">
        <AppIcon name="simulation" :size="48" />
      </div>
      <p class="empty-title">暂无仿真电路</p>
      <p class="empty-desc">请将 HTML 文件放到 beta/simulation/ 目录</p>
    </div>

    <div v-else class="sim-grid">
      <div
        v-for="item in simulation"
        :key="item.id"
        class="sim-card glass"
      >
        <div class="sim-thumb">
          <img
            v-if="item.thumbnail"
            :src="item.thumbnail"
            :alt="item.title"
            class="sim-thumb-img"
            @error="onImageError"
          />
          <AppIcon v-else name="lightning" :size="56" />
        </div>
        <div class="sim-body">
          <div class="sim-meta">
            <span class="tag">{{ item.complexity }}</span>
          </div>
          <h3 class="sim-title">{{ item.title }}</h3>
          <p class="sim-desc">{{ item.description }}</p>
          <div v-if="item.tags.length" class="sim-tags">
            <span v-for="tag in item.tags" :key="tag" class="sim-tag">{{ tag }}</span>
          </div>
          <div class="sim-actions">
            <button class="btn-run" @click="runSimulation(item)">
              <AppIcon name="play" :size="16" />
              运行仿真
            </button>
          </div>
        </div>
      </div>
    </div>

    <DockBar />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import DockBar from '../components/common/DockBar.vue';
import AppIcon from '../components/common/AppIcon.vue';
import { useCatalog } from '../composables/useCatalog';
import type { SimulationItem } from '../engines/dataLoader';

const { simulation, loading, load } = useCatalog();

const runSimulation = (item: SimulationItem) => {
  window.open(item.filePath, '_blank');
};

const onImageError = (e: Event) => {
  const img = e.target as HTMLImageElement;
  img.style.display = 'none';
};

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
    0 12px 32px rgba(175, 82, 222, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
}

.sim-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.sim-card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.sim-thumb {
  aspect-ratio: 16 / 9;
  background: var(--bg-level-2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-quaternary);
  overflow: hidden;
  position: relative;
}

.sim-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.sim-body {
  padding: 28px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.sim-meta {
  display: flex;
  gap: 6px;
  margin-bottom: 14px;
}

.tag {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-purple);
  background: rgba(175, 82, 222, 0.12);
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  letter-spacing: -0.01em;
}

.sim-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.025em;
  margin-bottom: 8px;
}

.sim-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 16px;
  flex: 1;
}

.sim-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
}

.sim-tag {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-tertiary);
  background: var(--bg-level-2);
  padding: 3px 8px;
  border-radius: var(--radius-sm);
}

.sim-actions {
  display: flex;
  gap: 10px;
  padding-top: 20px;
  border-top: 1px solid var(--border-subtle);
}

.btn-run {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: var(--color-blue);
  color: white;
  border-radius: var(--radius-pill);
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 8px 20px rgba(0, 113, 227, 0.25);
}

.btn-run:hover {
  background: var(--color-blue-hover);
  transform: translateY(-1px);
  box-shadow: 0 12px 28px rgba(0, 113, 227, 0.35);
}

.state-loading {
  display: flex;
  justify-content: center;
  padding: 80px 0;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 2px solid var(--border-default);
  border-top-color: var(--color-blue);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty {
  text-align: center;
  padding: 100px 40px;
}

.empty-icon {
  color: var(--text-quaternary);
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 6px;
}

.empty-desc {
  font-size: 13px;
  color: var(--text-tertiary);
}

@media (max-width: 768px) {
  .sim-grid {
    grid-template-columns: 1fr;
  }
}
</style>