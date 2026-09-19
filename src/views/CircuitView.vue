<template>
  <div class="page">
    <header class="page-header">
      <div class="header-icon" :style="{ background: 'linear-gradient(135deg, #34c759, #30d158)' }">
        <AppIcon name="circuit" :size="28" />
      </div>
      <h1 class="page-title">电路图</h1>
      <p class="page-desc">浏览与绘制电路图</p>
    </header>

    <div class="filter-bar glass">
      <div class="search">
        <AppIcon name="search" :size="16" />
        <input v-model="searchQuery" type="text" placeholder="搜索电路图..." />
      </div>

      <select v-model="selectedCategory" class="select">
        <option value="all">全部分类</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
      </select>
    </div>

    <div v-if="loading" class="state-loading">
      <div class="spinner"></div>
    </div>

    <div v-else-if="filtered.length === 0" class="empty glass">
      <div class="empty-icon">
        <AppIcon name="circuit" :size="48" />
      </div>
      <p class="empty-title">暂无电路图</p>
      <p class="empty-desc">请将 SVG 或 PNG 文件放到 beta/circuits/ 目录</p>
    </div>

    <div v-else class="circuit-grid">
      <a
        v-for="item in filtered"
        :key="item.id"
        :href="item.filePath"
        target="_blank"
        rel="noopener"
        class="circuit-card glass"
      >
        <div class="circuit-thumb">
          <img
            v-if="item.thumbnail"
            :src="item.thumbnail"
            :alt="item.title"
            class="circuit-thumb-img"
            @error="onImageError"
          />
          <AppIcon v-else name="circuit" :size="48" />
        </div>
        <div class="circuit-body">
          <div class="circuit-meta">
            <span class="tag">{{ item.category }}</span>
          </div>
          <h3 class="circuit-name">{{ item.title }}</h3>
          <p class="circuit-desc">{{ item.description }}</p>
          <div v-if="item.tags.length" class="circuit-tags">
            <span v-for="tag in item.tags" :key="tag" class="circuit-tag">{{ tag }}</span>
          </div>
        </div>
      </a>
    </div>

    <DockBar />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import DockBar from '../components/common/DockBar.vue';
import AppIcon from '../components/common/AppIcon.vue';
import { useCatalog } from '../composables/useCatalog';

const { circuits, loading, load } = useCatalog();

const searchQuery = ref('');
const selectedCategory = ref('all');

const categories = computed(() => {
  const set = new Set(circuits.value.map(c => c.category));
  return Array.from(set).map(name => ({ id: name, name }));
});

const filtered = computed(() => {
  let result = circuits.value;
  if (selectedCategory.value !== 'all') {
    result = result.filter(c => c.category === selectedCategory.value);
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  }
  return result;
});

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
    0 12px 32px rgba(52, 199, 89, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
}

.filter-bar {
  display: flex;
  gap: 12px;
  padding: 14px;
  margin-bottom: 32px;
  flex-wrap: wrap;
  border-radius: var(--radius-xl);
}

.search {
  position: relative;
  flex: 1;
  min-width: 220px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
  background: var(--glass-bg-weak);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  color: var(--text-tertiary);
}

.search input {
  flex: 1;
  padding: 12px 0;
  background: transparent;
  border: none;
  font-size: 14px;
  color: var(--text-primary);
}

.search input::placeholder {
  color: var(--text-quaternary);
}

.select {
  padding: 12px 16px;
  background: var(--glass-bg-weak);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--text-primary);
  cursor: pointer;
}

.circuit-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.circuit-card {
  display: block;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
}

.circuit-thumb {
  aspect-ratio: 16 / 10;
  background: var(--bg-level-2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-quaternary);
  overflow: hidden;
}

.circuit-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 16px;
}

.circuit-body {
  padding: 24px;
}

.circuit-meta {
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
}

.tag {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-green);
  background: rgba(52, 199, 89, 0.12);
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  letter-spacing: -0.01em;
}

.circuit-name {
  font-size: 17px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  margin-bottom: 6px;
}

.circuit-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 12px;
}

.circuit-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.circuit-tag {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-tertiary);
  background: var(--bg-level-2);
  padding: 3px 8px;
  border-radius: var(--radius-sm);
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

@media (max-width: 1024px) {
  .circuit-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .circuit-grid {
    grid-template-columns: 1fr;
  }

  .filter-bar {
    flex-direction: column;
  }
}
</style>