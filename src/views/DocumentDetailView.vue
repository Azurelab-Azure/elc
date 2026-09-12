<template>
  <div class="page">
    <div v-if="loading" class="state-loading">
      <div class="spinner"></div>
    </div>

    <div v-else-if="!document" class="state-empty">
      <h2 class="state-empty-title">文档不存在</h2>
      <p class="state-empty-desc">未找到该文档</p>
      <router-link to="/documents" class="btn-primary">返回文档中心</router-link>
    </div>

    <template v-else>
      <header class="detail-header">
        <router-link to="/documents" class="back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 19l-7-7 7-7"/>
          </svg>
          返回文档中心
        </router-link>

        <div class="meta-row">
          <span class="tag">{{ document.type }}</span>
          <span v-if="document.readTime" class="tag tag-gray">{{ document.readTime }}</span>
        </div>

        <h1 class="detail-title">{{ document.title }}</h1>
        <p class="detail-desc">{{ document.description }}</p>

        <div class="info-grid">
          <div v-if="document.author" class="info-item">
            <span class="info-label">作者</span>
            <span class="info-value">{{ document.author }}</span>
          </div>
          <div v-if="document.date" class="info-item">
            <span class="info-label">日期</span>
            <span class="info-value">{{ document.date }}</span>
          </div>
        </div>
      </header>

      <article class="doc-content" v-html="renderedContent"></article>
    </template>

    <DockBar />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { marked } from 'marked';
import DockBar from '../components/common/DockBar.vue';
import { dataLoader } from '../engines/dataLoader';
import type { DocumentItem } from '../engines/dataLoader';

const route = useRoute();
const document = ref<DocumentItem | null>(null);
const renderedContent = ref('');
const loading = ref(true);

const mdModules = import.meta.glob('/beta/docs/**/*.md', {
  query: '?raw',
  import: 'default'
});

const loadDocument = async () => {
  loading.value = true;
  const id = route.params.id as string;

  if (!dataLoader.hasData()) {
    await dataLoader.loadAll();
  }

  document.value = dataLoader.getDocumentById(id) || null;

  if (document.value) {
    try {
      const target = document.value;
      const key = Object.keys(mdModules).find(k => {
        const parts = k.split('/');
        const fileName = parts[parts.length - 1].replace('.md', '');
        const category = parts[parts.length - 2];
        return `${category}-${fileName}` === target.id;
      });

      if (key) {
        const raw = await mdModules[key]() as string;
        renderedContent.value = await marked.parse(raw);
      } else {
        renderedContent.value = '<p>无法加载文档内容</p>';
      }
    } catch (err) {
      renderedContent.value = `<p>加载失败：${(err as Error).message}</p>`;
    }
  }

  loading.value = false;
};

onMounted(loadDocument);
watch(() => route.params.id, loadDocument);
</script>

<style scoped>


.detail-header {
  max-width: 800px;
  margin: 0 auto 48px;
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

.doc-content {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  padding: 48px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  font-size: 16px;
  line-height: 1.7;
  color: var(--color-gray-700);
}

.doc-content :deep(h1) {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.025em;
  margin: 32px 0 16px;
  line-height: 1.2;
}

.doc-content :deep(h1:first-child) {
  margin-top: 0;
}

.doc-content :deep(h2) {
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 32px 0 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--color-gray-200);
}

.doc-content :deep(h3) {
  font-size: 19px;
  font-weight: 600;
  letter-spacing: -0.015em;
  margin: 24px 0 8px;
}

.doc-content :deep(p) {
  margin: 12px 0;
}

.doc-content :deep(ul),
.doc-content :deep(ol) {
  margin: 12px 0;
  padding-left: 24px;
}

.doc-content :deep(li) {
  margin: 6px 0;
}

.doc-content :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background: var(--color-gray-100);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--color-gray-700);
}

.doc-content :deep(pre) {
  background: #1d1d1f;
  color: #f5f5f7;
  padding: 20px;
  border-radius: 12px;
  overflow-x: auto;
  margin: 16px 0;
  font-size: 14px;
  line-height: 1.5;
}

.doc-content :deep(pre code) {
  background: none;
  padding: 0;
  color: inherit;
  font-size: inherit;
}

.doc-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-size: 14px;
}

.doc-content :deep(th),
.doc-content :deep(td) {
  padding: 10px 14px;
  text-align: left;
  border-bottom: 1px solid var(--color-gray-200);
}

.doc-content :deep(th) {
  font-weight: 600;
  background: var(--color-gray-100);
}

.doc-content :deep(blockquote) {
  border-left: 3px solid var(--color-blue);
  padding-left: 16px;
  margin: 16px 0;
  color: var(--color-gray-500);
}

.doc-content :deep(a) {
  color: var(--color-blue);
}

.doc-content :deep(img) {
  max-width: 100%;
  border-radius: 12px;
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

  .doc-content {
    padding: 24px;
    font-size: 15px;
  }
}


</style>