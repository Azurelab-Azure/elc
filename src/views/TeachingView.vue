<template>
  <div class="page">
    <header class="page-header">
      <div class="header-icon" :style="{ background: 'linear-gradient(135deg, #0071e3, #0a84ff)' }">
        <AppIcon name="teaching" :size="28" />
      </div>
      <h1 class="page-title">电路教学</h1>
      <p class="page-desc">从基础到进阶的电路知识体系</p>
    </header>

    <div v-if="loading" class="state-loading">
      <div class="spinner"></div>
    </div>

    <div v-else-if="teaching.length === 0" class="empty glass">
      <div class="empty-icon">
        <AppIcon name="teaching" :size="48" />
      </div>
      <p class="empty-title">暂无教学文档</p>
      <p class="empty-desc">请将 Markdown 或 HTML 文件放到 beta/teaching/ 目录</p>
    </div>

    <div v-else class="doc-grid">
      <component
        v-for="doc in teaching"
        :key="doc.id"
        :is="doc.format === 'html' ? 'a' : 'div'"
        :href="doc.format === 'html' ? doc.filePath : undefined"
        :target="doc.format === 'html' ? '_blank' : undefined"
        :rel="doc.format === 'html' ? 'noopener' : undefined"
        class="doc-card glass"
        :class="{ 'doc-card-link': doc.format === 'html' }"
        @click="doc.format === 'md' ? openMarkdown(doc) : null"
      >
        <div class="doc-head">
          <div class="doc-head-left">
            <span class="doc-format" :class="`doc-format-${doc.format}`">
              {{ doc.format === 'html' ? 'HTML' : 'MD' }}
            </span>
            <span class="doc-level">{{ doc.level }}</span>
          </div>
          <span v-if="doc.readTime" class="doc-time">{{ doc.readTime }}</span>
        </div>

        <h3 class="doc-title">{{ doc.title }}</h3>
        <p class="doc-desc">{{ doc.description }}</p>

        <div v-if="doc.tags.length" class="doc-tags">
          <span v-for="tag in doc.tags" :key="tag" class="doc-tag">{{ tag }}</span>
        </div>

        <div class="doc-meta">
          <span v-if="doc.author">{{ doc.author }}</span>
          <span v-if="doc.author && doc.date" class="dot"></span>
          <span v-if="doc.date">{{ doc.date }}</span>
          <span class="doc-action">
            {{ doc.format === 'html' ? '打开教学' : '阅读教程' }}
            <AppIcon name="arrowRight" :size="14" />
          </span>
        </div>
      </component>
    </div>

    <!-- Markdown 阅读弹窗 -->
    <Teleport to="body">
      <Transition name="reader">
        <div v-if="readerVisible" class="reader-overlay" @click.self="closeReader">
          <div class="reader-modal glass-strong">
            <div class="reader-header">
              <div>
                <span class="reader-tag">{{ activeDoc?.level }}</span>
                <h2 class="reader-title">{{ activeDoc?.title }}</h2>
              </div>
              <button class="reader-close" @click="closeReader">
                <AppIcon name="close" :size="20" />
              </button>
            </div>
            <div class="reader-body">
              <div v-if="readerLoading" class="reader-loading">
                <div class="spinner"></div>
              </div>
              <article v-else class="reader-content selectable" v-html="readerContent"></article>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <DockBar />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { marked } from 'marked';
import DockBar from '../components/common/DockBar.vue';
import AppIcon from '../components/common/AppIcon.vue';
import { useCatalog } from '../composables/useCatalog';
import type { TeachingItem } from '../engines/dataLoader';

const { teaching, loading, load } = useCatalog();

const readerVisible = ref(false);
const readerLoading = ref(false);
const readerContent = ref('');
const activeDoc = ref<TeachingItem | null>(null);

const mdModules = import.meta.glob('/beta/teaching/**/*.md', {
  query: '?raw',
  import: 'default'
});

const openMarkdown = async (doc: TeachingItem) => {
  activeDoc.value = doc;
  readerVisible.value = true;
  readerLoading.value = true;
  readerContent.value = '';

  try {
    const key = Object.keys(mdModules).find(k => k === doc.filePath);
    if (key) {
      const raw = await mdModules[key]() as string;
      readerContent.value = await marked.parse(raw);
    } else {
      readerContent.value = '<p>无法加载文档内容</p>';
    }
  } catch (err) {
    readerContent.value = `<p>加载失败：${(err as Error).message}</p>`;
  } finally {
    readerLoading.value = false;
  }
};

const closeReader = () => {
  readerVisible.value = false;
  activeDoc.value = null;
  readerContent.value = '';
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
    0 12px 32px rgba(0, 113, 227, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
}

.doc-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.doc-card {
  padding: 28px;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.doc-card-link {
  cursor: pointer;
}

.doc-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.doc-head-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.doc-format {
  font-size: 10px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  letter-spacing: 0.05em;
}

.doc-format-md {
  color: var(--color-blue);
  background: var(--color-blue-soft);
}

.doc-format-html {
  color: var(--color-purple);
  background: rgba(175, 82, 222, 0.12);
}

.doc-level {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-tertiary);
  background: var(--bg-level-2);
  padding: 4px 10px;
  border-radius: var(--radius-sm);
}

.doc-time {
  font-size: 12px;
  color: var(--text-tertiary);
  font-weight: 500;
}

.doc-title {
  font-size: 19px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.doc-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.doc-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}

.doc-tag {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-tertiary);
  background: var(--bg-level-2);
  padding: 3px 8px;
  border-radius: var(--radius-sm);
}

.doc-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text-tertiary);
  padding-top: 14px;
  border-top: 1px solid var(--border-subtle);
}

.dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--text-quaternary);
}

.doc-action {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
  font-weight: 600;
  color: var(--color-blue);
  transition: all 0.2s ease;
}

.doc-card:hover .doc-action {
  transform: translateX(2px);
}

/* Markdown 阅读弹窗 */
.reader-overlay {
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

.reader-modal {
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  border-radius: var(--radius-2xl);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.reader-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 28px 32px;
  border-bottom: 1px solid var(--border-subtle);
}

.reader-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  color: var(--color-blue);
  background: var(--color-blue-soft);
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  margin-bottom: 10px;
}

.reader-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.reader-close {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-tertiary);
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.reader-close:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.reader-body {
  padding: 32px;
  overflow-y: auto;
  flex: 1;
}

.reader-loading {
  display: flex;
  justify-content: center;
  padding: 60px 0;
}

.reader-content {
  font-size: 16px;
  line-height: 1.7;
  color: var(--text-primary);
}

.reader-content :deep(h1) {
  font-size: 28px;
  font-weight: 700;
  margin: 32px 0 16px;
  letter-spacing: -0.025em;
}

.reader-content :deep(h1:first-child) {
  margin-top: 0;
}

.reader-content :deep(h2) {
  font-size: 22px;
  font-weight: 600;
  margin: 28px 0 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border-subtle);
  letter-spacing: -0.02em;
}

.reader-content :deep(h3) {
  font-size: 18px;
  font-weight: 600;
  margin: 20px 0 8px;
}

.reader-content :deep(p) {
  margin: 12px 0;
}

.reader-content :deep(ul),
.reader-content :deep(ol) {
  margin: 12px 0;
  padding-left: 24px;
}

.reader-content :deep(li) {
  margin: 6px 0;
}

.reader-content :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background: var(--bg-level-2);
  padding: 2px 6px;
  border-radius: 4px;
}

.reader-content :deep(pre) {
  background: #1d1d1f;
  color: #f5f5f7;
  padding: 20px;
  border-radius: 12px;
  overflow-x: auto;
  margin: 16px 0;
  font-size: 14px;
}

.reader-content :deep(pre code) {
  background: none;
  padding: 0;
  color: inherit;
}

.reader-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-size: 14px;
}

.reader-content :deep(th),
.reader-content :deep(td) {
  padding: 10px 14px;
  text-align: left;
  border-bottom: 1px solid var(--border-subtle);
}

.reader-content :deep(th) {
  font-weight: 600;
  background: var(--bg-level-2);
}

.reader-content :deep(blockquote) {
  border-left: 3px solid var(--color-blue);
  padding-left: 16px;
  margin: 16px 0;
  color: var(--text-secondary);
}

.reader-content :deep(a) {
  color: var(--color-blue);
}

.reader-content :deep(img) {
  max-width: 100%;
  border-radius: 12px;
}

.reader-enter-active,
.reader-leave-active {
  transition: opacity 0.25s ease;
}

.reader-enter-active .reader-modal,
.reader-leave-active .reader-modal {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.reader-enter-from,
.reader-leave-to {
  opacity: 0;
}

.reader-enter-from .reader-modal,
.reader-leave-to .reader-modal {
  transform: scale(0.95) translateY(20px);
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
  .doc-grid {
    grid-template-columns: 1fr;
  }

  .reader-modal {
    max-height: 95vh;
  }

  .reader-header {
    padding: 20px 24px;
  }

  .reader-body {
    padding: 24px;
  }
}
</style>