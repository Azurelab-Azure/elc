<template>
  <div class="page">
    <div v-if="loading" class="state-loading">
      <div class="spinner"></div>
    </div>

    <div v-else-if="!circuit" class="state-empty">
      <h2 class="state-empty-title">电路不存在</h2>
      <p class="state-empty-desc">未找到该电路</p>
      <router-link to="/repository" class="btn-primary">返回仓库</router-link>
    </div>

    <template v-else>
      <header class="detail-header">
        <router-link to="/repository" class="back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 19l-7-7 7-7"/>
          </svg>
          返回仓库
        </router-link>

        <div class="meta-row">
          <span class="tag">{{ circuit.category }}</span>
          <span class="tag tag-gray">{{ circuit.complexity }}</span>
        </div>

        <h1 class="detail-title">{{ circuit.name }}</h1>
        <p class="detail-desc">{{ circuit.description }}</p>

        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">作者</span>
            <span class="info-value">{{ circuit.author || '匿名' }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">日期</span>
            <span class="info-value">{{ circuit.date || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">文件</span>
            <span class="info-value info-mono">{{ circuit.filePath }}</span>
          </div>
        </div>
      </header>

      <section class="viewer">
        <div class="viewer-toolbar">
          <span class="toolbar-title">电路预览</span>
          <div class="toolbar-actions">
            <button class="tool-btn" @click="reload">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              重新加载
            </button>
            <button class="tool-btn" @click="openNewTab">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              新窗口
            </button>
          </div>
        </div>

        <div class="viewer-frame">
          <iframe
            ref="iframeRef"
            :src="circuit.filePath"
            class="viewer-iframe"
            frameborder="0"
            sandbox="allow-scripts allow-same-origin"
          ></iframe>
        </div>
      </section>
    </template>

    <DockBar />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import DockBar from '../components/common/DockBar.vue';
import { dataLoader } from '../engines/dataLoader';
import type { CircuitItem } from '../engines/dataLoader';

const route = useRoute();
const iframeRef = ref<HTMLIFrameElement | null>(null);
const circuit = ref<CircuitItem | null>(null);
const loading = ref(true);

const loadCircuit = async () => {
  loading.value = true;
  const id = route.params.id as string;

  if (!dataLoader.hasData()) {
    await dataLoader.loadAll();
  }

  circuit.value = dataLoader.getCircuitById(id) || null;
  loading.value = false;
};

const reload = () => {
  if (iframeRef.value && circuit.value) {
    iframeRef.value.src = circuit.value.filePath;
  }
};

const openNewTab = () => {
  if (circuit.value) {
    window.open(circuit.value.filePath, '_blank');
  }
};

onMounted(loadCircuit);
watch(() => route.params.id, loadCircuit);
</script>

<style scoped>


.detail-header {
  max-width: 1200px;
  margin: 0 auto 40px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-blue);
  margin-bottom: 24px;
}

.back-link svg {
  width: 16px;
  height: 16px;
}

.meta-row {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.tag {
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-blue);
  background: rgba(0, 113, 227, 0.08);
  padding: 4px 10px;
  border-radius: 6px;
}

.tag-gray {
  color: var(--color-gray-600);
  background: var(--color-gray-100);
}

.detail-title {
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--color-gray-700);
  line-height: 1.15;
  margin-bottom: 12px;
}

.detail-desc {
  font-size: 17px;
  color: var(--color-gray-500);
  line-height: 1.5;
  max-width: 720px;
  margin-bottom: 24px;
}

.info-grid {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  padding-top: 20px;
  border-top: 1px solid var(--color-gray-200);
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-label {
  font-size: 12px;
  color: var(--color-gray-400);
}

.info-value {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-gray-700);
}

.info-mono {
  font-family: var(--font-mono);
  font-size: 13px;
}

.viewer {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.viewer-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid var(--color-gray-200);
  background: var(--color-gray-100);
}

.toolbar-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-gray-700);
}

.toolbar-actions {
  display: flex;
  gap: 8px;
}

.tool-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-gray-600);
  background: white;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.tool-btn:hover {
  color: var(--color-blue);
  background: rgba(0, 113, 227, 0.06);
}

.tool-btn svg {
  width: 14px;
  height: 14px;
}

.viewer-frame {
  position: relative;
  height: 640px;
  background: var(--color-gray-50);
}

.viewer-iframe {
  width: 100%;
  height: 100%;
  display: block;
}

.state-loading {
  display: flex;
  justify-content: center;
  padding: 200px 0;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 2px solid var(--color-gray-200);
  border-top-color: var(--color-blue);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.state-empty {
  max-width: 480px;
  margin: 120px auto;
  text-align: center;
}

.state-empty-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-gray-700);
  margin-bottom: 8px;
}

.state-empty-desc {
  font-size: 15px;
  color: var(--color-gray-500);
  margin-bottom: 24px;
}

.btn-primary {
  display: inline-block;
  padding: 10px 24px;
  background: var(--color-blue);
  color: white;
  border-radius: 980px;
  font-size: 14px;
  font-weight: 500;
}

@media (max-width: 640px) {
  .page {
    padding: 24px 16px 120px;
  }

  .viewer-frame {
    height: 480px;
  }

  .info-grid {
    gap: 20px;
  }
}


</style>