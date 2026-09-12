<template>
  <div class="page">
    <header class="page-header">
      <h1 class="page-title">仿真器</h1>
      <p class="page-desc">选择电路进行仿真</p>
    </header>

    <div v-if="loading" class="state-loading">
      <div class="spinner"></div>
    </div>

    <div v-else-if="circuits.length === 0" class="empty">
      <p class="empty-title">暂无电路数据</p>
      <p class="empty-desc">请将电路 HTML 文件放到 beta/circuits/ 目录</p>
    </div>

    <div v-else class="grid">
      <router-link
        v-for="circuit in circuits"
        :key="circuit.id"
        :to="`/circuit/${circuit.id}`"
        class="card"
      >
        <div class="card-icon" :style="{ background: getCategoryColor(circuit.category) }">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
        </div>
        <div class="card-body">
          <div class="card-meta">
            <span class="tag">{{ circuit.category }}</span>
            <span class="tag-gray">{{ circuit.complexity }}</span>
          </div>
          <h3 class="card-title">{{ circuit.name }}</h3>
          <p class="card-desc">{{ circuit.description }}</p>
        </div>
        <svg class="card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 5l7 7-7 7"/>
        </svg>
      </router-link>
    </div>

    <DockBar />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import DockBar from '../components/common/DockBar.vue';
import { useCatalog } from '../composables/useCatalog';

const { circuits, loading, load } = useCatalog();

const colorMap: Record<string, string> = {
  'three-phase': '#0071e3',
  'plc': '#af52de',
  'basic': '#34c759',
  'advanced': '#ff9500'
};

const getCategoryColor = (category: string): string => colorMap[category] || '#0071e3';

onMounted(load);
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: var(--bg-level-1);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-subtle);
  text-decoration: none;
  color: inherit;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  border-color: var(--border-default);
  transform: translateY(-3px);
  opacity: 1;
}

.card-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-icon svg {
  width: 22px;
  height: 22px;
}

.card-body {
  flex: 1;
  min-width: 0;
}

.card-meta {
  display: flex;
  gap: 6px;
  margin-bottom: 6px;
}

.tag {
  font-size: 11px;
  font-weight: 500;
  color: var(--color-blue);
  background: var(--color-blue-soft);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
}

.tag-gray {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg-level-2);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.015em;
  margin-bottom: 3px;
}

.card-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-arrow {
  width: 16px;
  height: 16px;
  color: var(--text-quaternary);
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.card:hover .card-arrow {
  color: var(--color-blue);
  transform: translateX(3px);
}

.empty {
  text-align: center;
  padding: 80px 20px;
}

.empty-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 6px;
}

.empty-desc {
  font-size: 13px;
  color: var(--text-tertiary);
}

.state-loading {
  display: flex;
  justify-content: center;
  padding: 80px 0;
}

.spinner {
  width: 28px;
  height: 28px;
  border: 2px solid var(--border-default);
  border-top-color: var(--color-blue);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>