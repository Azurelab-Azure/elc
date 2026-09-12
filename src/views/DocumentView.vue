<template>
  <div class="page">
    <header class="page-header">
      <h1 class="page-title">文档中心</h1>
      <p class="page-desc">来自 beta/docs 的文档资料</p>
    </header>

    <div class="layout">
      <aside class="sidebar">
        <h2 class="sidebar-title">分类</h2>
        <nav class="sidebar-nav">
          <button
            v-for="type in documentTypes"
            :key="type"
            class="sidebar-item"
            :class="{ 'sidebar-item-active': type === currentType }"
            @click="currentType = type"
          >
            <span class="sidebar-label">{{ type === 'all' ? '全部' : type }}</span>
            <span class="sidebar-count">{{ getCount(type) }}</span>
          </button>
        </nav>
      </aside>

      <main class="content">
        <div v-if="loading" class="state-loading">
          <div class="spinner"></div>
        </div>

        <div v-else-if="filteredDocuments.length === 0" class="empty">
          <p class="empty-title">暂无文档数据</p>
          <p class="empty-desc">请将 Markdown 文件放到 beta/docs/ 目录</p>
        </div>

        <div v-else class="doc-list">
          <router-link
            v-for="doc in filteredDocuments"
            :key="doc.id"
            :to="`/document/${doc.id}`"
            class="doc-card"
          >
            <div class="doc-head">
              <span class="doc-tag">{{ doc.type }}</span>
              <span v-if="doc.readTime" class="doc-time">{{ doc.readTime }}</span>
            </div>
            <h3 class="doc-title">{{ doc.title }}</h3>
            <p class="doc-desc">{{ doc.description }}</p>
            <div class="doc-meta">
              <span v-if="doc.author">{{ doc.author }}</span>
              <span v-if="doc.author && doc.date" class="dot"></span>
              <span v-if="doc.date">{{ doc.date }}</span>
            </div>
          </router-link>
        </div>
      </main>
    </div>

    <DockBar />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import DockBar from '../components/common/DockBar.vue';
import { useCatalog } from '../composables/useCatalog';

const { documents, loading, load } = useCatalog();
const currentType = ref('all');

const documentTypes = computed(() => {
  const types = new Set(documents.value.map(d => d.type));
  return ['all', ...Array.from(types)];
});

const filteredDocuments = computed(() => {
  if (currentType.value === 'all') return documents.value;
  return documents.value.filter(d => d.type === currentType.value);
});

const getCount = (type: string): number => {
  if (type === 'all') return documents.value.length;
  return documents.value.filter(d => d.type === type).length;
};

onMounted(load);
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 40px;
}

.sidebar-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 14px;
  padding-left: 12px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 12px;
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  text-align: left;
  transition: all 0.15s ease;
}

.sidebar-item:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.sidebar-item-active {
  background: var(--color-blue-soft);
  color: var(--color-blue);
}

.sidebar-item-active:hover {
  background: var(--color-blue-soft);
  color: var(--color-blue);
}

.sidebar-count {
  font-size: 12px;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
}

.sidebar-item-active .sidebar-count {
  color: var(--color-blue);
}

.doc-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.doc-card {
  display: block;
  padding: 20px 22px;
  background: var(--bg-level-1);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-subtle);
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
}

.doc-card:hover {
  border-color: var(--border-default);
  background: var(--bg-hover);
  opacity: 1;
}

.doc-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.doc-tag {
  font-size: 11px;
  font-weight: 500;
  color: var(--color-blue);
  background: var(--color-blue-soft);
  padding: 3px 8px;
  border-radius: var(--radius-sm);
}

.doc-time {
  font-size: 12px;
  color: var(--text-tertiary);
}

.doc-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.015em;
  margin-bottom: 6px;
}

.doc-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.doc-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text-tertiary);
}

.dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--text-quaternary);
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

@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .sidebar-nav {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 6px;
  }

  .sidebar-item {
    flex: 0 0 auto;
    padding: 6px 14px;
    border-radius: var(--radius-pill);
  }
}
</style>