<template>
  <div class="page">
    <header class="page-header">
      <h1 class="page-title">电路仓库</h1>
      <p class="page-desc">浏览 beta/circuits 中的电路</p>
    </header>

    <div class="filter-bar">
      <div class="search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input v-model="searchQuery" type="text" placeholder="搜索电路图..." />
      </div>

      <select v-model="selectedCategory" class="select">
        <option value="all">全部类型</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
      </select>

      <select v-model="sortBy" class="select">
        <option value="name">按名称</option>
        <option value="category">按分类</option>
        <option value="complexity">按难度</option>
      </select>
    </div>

    <div v-if="loading" class="state-loading">
      <div class="spinner"></div>
    </div>

    <div v-else-if="filteredCircuits.length === 0" class="empty">
      <p class="empty-title">暂无电路数据</p>
      <p class="empty-desc">请将电路 HTML 文件放到 beta/circuits/ 目录</p>
    </div>

    <template v-else>
      <div class="grid">
        <router-link
          v-for="item in paginatedCircuits"
          :key="item.id"
          :to="`/circuit/${item.id}`"
          class="card"
        >
          <div class="card-thumb">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div class="card-body">
            <div class="card-meta">
              <span class="tag">{{ item.category }}</span>
              <span class="tag-gray">{{ item.complexity }}</span>
            </div>
            <h3 class="card-title">{{ item.name }}</h3>
            <p class="card-desc">{{ item.description }}</p>
            <div class="card-footer">
              <span class="card-author">{{ item.author || '匿名' }}</span>
            </div>
          </div>
        </router-link>
      </div>

      <div v-if="totalPages > 1" class="pagination">
        <button :disabled="currentPage === 1" class="page-btn" @click="currentPage--">上一页</button>
        <button
          v-for="page in totalPages"
          :key="page"
          class="page-btn"
          :class="{ 'page-btn-active': page === currentPage }"
          @click="currentPage = page"
        >
          {{ page }}
        </button>
        <button :disabled="currentPage === totalPages" class="page-btn" @click="currentPage++">下一页</button>
      </div>
    </template>

    <DockBar />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import DockBar from '../components/common/DockBar.vue';
import { useCatalog } from '../composables/useCatalog';

const { circuits, categories, loading, load } = useCatalog();

const searchQuery = ref('');
const selectedCategory = ref('all');
const sortBy = ref('name');
const currentPage = ref(1);
const pageSize = 9;

const filteredCircuits = computed(() => {
  let result = circuits.value;
  if (selectedCategory.value !== 'all') {
    result = result.filter(c => c.category === selectedCategory.value);
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  }
  return [...result].sort((a, b) => {
    if (sortBy.value === 'name') return a.name.localeCompare(b.name);
    if (sortBy.value === 'category') return a.category.localeCompare(b.category);
    if (sortBy.value === 'complexity') return a.complexity.localeCompare(b.complexity);
    return 0;
  });
});

const totalPages = computed(() => Math.ceil(filteredCircuits.value.length / pageSize));
const paginatedCircuits = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredCircuits.value.slice(start, start + pageSize);
});

onMounted(load);
</script>

<style scoped>
.filter-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.search {
  position: relative;
  flex: 1;
  min-width: 240px;
}

.search svg {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--text-tertiary);
  pointer-events: none;
}

.search input {
  width: 100%;
  padding: 12px 16px 12px 42px;
  background: var(--bg-level-1);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.search input::placeholder {
  color: var(--text-quaternary);
}

.search input:focus {
  border-color: var(--color-blue);
  box-shadow: 0 0 0 3px var(--color-blue-soft);
}

.select {
  padding: 12px 16px;
  background: var(--bg-level-1);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.select:hover {
  border-color: var(--border-default);
}

.select:focus {
  border-color: var(--color-blue);
  box-shadow: 0 0 0 3px var(--color-blue-soft);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-bottom: 40px;
}

.card {
  display: flex;
  flex-direction: column;
  background: var(--bg-level-1);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  text-decoration: none;
  color: inherit;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  border-color: var(--border-default);
  transform: translateY(-2px);
  opacity: 1;
}

.card-thumb {
  aspect-ratio: 16 / 10;
  background: var(--bg-level-2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-quaternary);
  border-bottom: 1px solid var(--border-subtle);
}

.card-thumb svg {
  width: 40px;
  height: 40px;
  opacity: 0.5;
}

.card-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-meta {
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
}

.tag {
  font-size: 11px;
  font-weight: 500;
  color: var(--color-blue);
  background: var(--color-blue-soft);
  padding: 3px 8px;
  border-radius: var(--radius-sm);
}

.tag-gray {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg-level-2);
  padding: 3px 8px;
  border-radius: var(--radius-sm);
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.015em;
  margin-bottom: 6px;
}

.card-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 14px;
  flex: 1;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-tertiary);
  padding-top: 12px;
  border-top: 1px solid var(--border-subtle);
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 6px;
}

.page-btn {
  padding: 8px 14px;
  background: var(--bg-level-1);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
  transition: all 0.15s ease;
}

.page-btn:hover:not(:disabled) {
  background: var(--bg-hover);
  border-color: var(--border-default);
}

.page-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.page-btn-active {
  background: var(--color-blue);
  color: white;
  border-color: var(--color-blue);
}

.page-btn-active:hover {
  background: var(--color-blue);
  color: white;
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
  .filter-bar {
    flex-direction: column;
  }
}
</style>