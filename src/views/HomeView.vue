<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <p class="hero-eyebrow">电路仿真实验室</p>
        <h1 class="hero-title">
          探索电路世界
          <br />
          <span class="hero-gradient">从仿真开始</span>
        </h1>
        <p class="hero-subtitle">
          三相电、PLC、示波器、在线绘制，一站式电路仿真平台。让复杂的电路变得直观易懂。
        </p>
        <div class="hero-actions">
          <router-link to="/simulator" class="btn-primary">开始仿真</router-link>
          <router-link to="/editor" class="btn-secondary">在线绘制</router-link>
        </div>
      </div>

      <div class="hero-visual">
        <div class="visual-card">
          <div class="visual-header">
            <div class="traffic-lights">
              <span class="light light-red"></span>
              <span class="light light-yellow"></span>
              <span class="light light-green"></span>
            </div>
            <span class="visual-title">Oscilloscope</span>
          </div>
          <div class="visual-body">
            <svg viewBox="0 0 400 160" preserveAspectRatio="none">
              <path d="M0,80 Q50,20 100,80 T200,80 T300,80 T400,80" fill="none" stroke="#34c759" stroke-width="2"/>
              <path d="M0,80 Q50,140 100,80 T200,80 T300,80 T400,80" fill="none" stroke="#0071e3" stroke-width="2" opacity="0.7"/>
            </svg>
          </div>
        </div>

        <div class="visual-stats">
          <div class="stat-card">
            <div class="stat-value">380V</div>
            <div class="stat-label">额定电压</div>
          </div>
          <div class="stat-card">
            <div class="stat-value stat-blue">50Hz</div>
            <div class="stat-label">频率</div>
          </div>
          <div class="stat-card">
            <div class="stat-value stat-purple">99.9%</div>
            <div class="stat-label">精度</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2 class="section-title">功能模块</h2>
        <p class="section-sub">选择您需要的仿真工具</p>
      </div>

      <div v-if="loading" class="state-loading">
        <div class="spinner"></div>
      </div>

      <div v-else-if="categories.length === 0" class="empty">
        <p class="empty-title">暂无分类数据</p>
        <p class="empty-desc">请在 beta/catalog.json 中配置分类信息</p>
      </div>

      <div v-else class="category-grid">
        <router-link
          v-for="category in categories"
          :key="category.id"
          :to="category.path"
          class="category-card"
        >
          <div class="category-icon" :style="{ background: getColor(category.color) }">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path :d="category.icon" />
            </svg>
          </div>
          <h3 class="category-name">{{ category.name }}</h3>
          <p class="category-desc">{{ category.description }}</p>
          <span class="category-link">
            进入
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 5l7 7-7 7"/>
            </svg>
          </span>
        </router-link>
      </div>
    </section>

    <section class="section">
      <div class="section-head section-head-row">
        <div>
          <h2 class="section-title">精选电路</h2>
          <p class="section-sub">来自 beta/circuits 的电路数据</p>
        </div>
        <router-link to="/repository" class="section-link">查看全部</router-link>
      </div>

      <div v-if="loading" class="state-loading">
        <div class="spinner"></div>
      </div>

      <div v-else-if="circuits.length === 0" class="empty">
        <p class="empty-title">暂无电路数据</p>
        <p class="empty-desc">请将电路 HTML 文件放到 beta/circuits/ 目录</p>
      </div>

      <div v-else class="circuit-grid">
        <router-link
          v-for="circuit in circuits.slice(0, 6)"
          :key="circuit.id"
          :to="`/circuit/${circuit.id}`"
          class="circuit-card"
        >
          <div class="circuit-thumb">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div class="circuit-body">
            <span class="circuit-tag">{{ circuit.category }}</span>
            <h3 class="circuit-name">{{ circuit.name }}</h3>
            <p class="circuit-desc">{{ circuit.description }}</p>
          </div>
        </router-link>
      </div>
    </section>

    <section class="section">
      <div class="stats-panel">
        <div v-for="stat in stats" :key="stat.label" class="stats-item">
          <div class="stats-value">{{ stat.value }}</div>
          <div class="stats-label">{{ stat.label }}</div>
        </div>
      </div>
    </section>







    <!-- ===== 首页公告弹窗 ===== -->
<!-- 不需要时，删除或注释掉下面这一整块即可 -->
<AnnouncementModal
  title="电路仿真实验室上线"
  :lines="[
    '三相电、PLC、示波器、在线绘制',
    '所有数据来自 beta/ 目录，欢迎投稿',
    '本次更新：全局深色模式、自定义右键菜单',
    '注意：当前处于测试阶段，部分功能不完整，有错，缺失数据具有不稳定性，请谨慎使用。'
  ]"
  :actions="[
    { label: '开始探索', primary: true },
  ]"
  version="2026-09-12"
  storage-key="csl-home-announce"
  :delay="600"
/>
<!-- ===== 公告弹窗结束 ===== -->









    <DockBar />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import DockBar from '../components/common/DockBar.vue';
import { useCatalog } from '../composables/useCatalog';
import AnnouncementModal from '../components/home/AnnouncementModal.vue';

const { circuits, documents, categories, loading, load } = useCatalog();

const colorMap: Record<string, string> = {
  blue: '#0071e3',
  purple: '#af52de',
  green: '#34c759',
  orange: '#ff9500',
  red: '#ff3b30',
  indigo: '#5856d6'
};

const getColor = (color: string): string => colorMap[color] || '#0071e3';

const stats = computed(() => [
  { value: circuits.value.length, label: '电路模板' },
  { value: documents.value.length, label: '文档资料' },
  { value: categories.value.length, label: '分类模块' },
  { value: 0, label: '在线用户' }
]);

onMounted(load);
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: var(--bg-level-0);
  padding-bottom: 140px;
  transition: background-color 0.25s ease;
}

.hero {
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 24px 100px;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 80px;
  align-items: center;
}

.hero-eyebrow {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-blue);
  margin-bottom: 20px;
  letter-spacing: -0.01em;
}

.hero-title {
  font-size: clamp(40px, 5.5vw, 72px);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  margin-bottom: 24px;
}

.hero-gradient {
  background: linear-gradient(135deg, #0071e3 0%, #af52de 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 19px;
  line-height: 1.5;
  color: var(--text-secondary);
  max-width: 480px;
  margin-bottom: 40px;
  letter-spacing: -0.01em;
}

.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-primary {
  padding: 14px 28px;
  background: var(--color-blue);
  color: white;
  border-radius: var(--radius-pill);
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.01em;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: var(--color-blue-hover);
  opacity: 1;
}

.btn-secondary {
  padding: 14px 28px;
  background: var(--bg-level-1);
  color: var(--text-primary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-pill);
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.01em;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: var(--bg-hover);
  opacity: 1;
}

.hero-visual {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.visual-card {
  background: #1d1d1f;
  border-radius: var(--radius-lg);
  padding: 14px;
  border: 1px solid var(--border-subtle);
}

.visual-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.traffic-lights {
  display: flex;
  gap: 6px;
}

.light {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.light-red { background: #ff5f56; }
.light-yellow { background: #ffbd2e; }
.light-green { background: #27c93f; }

.visual-title {
  font-family: var(--font-mono);
  font-size: 11px;
  color: #86868b;
}

.visual-body {
  background: #000;
  border-radius: var(--radius-md);
  padding: 20px;
  height: 160px;
}

.visual-body svg {
  width: 100%;
  height: 100%;
}

.visual-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.stat-card {
  background: var(--bg-level-1);
  border-radius: var(--radius-md);
  padding: 16px;
  border: 1px solid var(--border-subtle);
}

.stat-value {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  margin-bottom: 4px;
}

.stat-blue { color: var(--color-blue); }
.stat-purple { color: var(--color-purple); }

.stat-label {
  font-size: 12px;
  color: var(--text-tertiary);
}

.section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px;
}

.section-head {
  margin-bottom: 40px;
}

.section-head-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.section-title {
  font-size: clamp(28px, 3.5vw, 40px);
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.025em;
  line-height: 1.15;
}

.section-sub {
  font-size: 16px;
  color: var(--text-secondary);
  margin-top: 8px;
}

.section-link {
  font-size: 15px;
  font-weight: 500;
  color: var(--color-blue);
  white-space: nowrap;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.category-card {
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: var(--bg-level-1);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-subtle);
  text-decoration: none;
  color: inherit;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.category-card:hover {
  border-color: var(--border-default);
  transform: translateY(-3px);
  opacity: 1;
}

.category-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
}

.category-icon svg {
  width: 20px;
  height: 20px;
}

.category-name {
  font-size: 17px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
  letter-spacing: -0.02em;
}

.category-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.4;
  margin-bottom: 18px;
}

.category-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-blue);
  margin-top: auto;
}

.category-link svg {
  width: 14px;
  height: 14px;
  transition: transform 0.2s ease;
}

.category-card:hover .category-link svg {
  transform: translateX(3px);
}

.circuit-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.circuit-card {
  display: block;
  background: var(--bg-level-1);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  text-decoration: none;
  color: inherit;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.circuit-card:hover {
  border-color: var(--border-default);
  transform: translateY(-3px);
  opacity: 1;
}

.circuit-thumb {
  aspect-ratio: 16 / 10;
  background: var(--bg-level-2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-quaternary);
  border-bottom: 1px solid var(--border-subtle);
}

.circuit-thumb svg {
  width: 42px;
  height: 42px;
  opacity: 0.5;
}

.circuit-body {
  padding: 20px;
}

.circuit-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 500;
  color: var(--color-blue);
  background: var(--color-blue-soft);
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  margin-bottom: 10px;
}

.circuit-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
  letter-spacing: -0.015em;
}

.circuit-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.stats-panel {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 40px;
  background: var(--bg-level-1);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-subtle);
}

.stats-item {
  text-align: center;
}

.stats-value {
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.stats-label {
  font-size: 13px;
  color: var(--text-secondary);
}

.state-loading {
  display: flex;
  justify-content: center;
  padding: 60px 0;
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

.empty {
  text-align: center;
  padding: 60px 20px;
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

@media (max-width: 1024px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 60px;
    padding: 80px 24px 60px;
  }

  .category-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .circuit-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .stats-panel {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .hero {
    padding: 60px 20px 40px;
  }

  .section {
    padding: 40px 20px;
  }

  .category-grid,
  .circuit-grid {
    grid-template-columns: 1fr;
  }

  .section-head-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .stats-panel {
    padding: 24px;
    gap: 20px;
  }

  .stats-value {
    font-size: 28px;
  }
}
</style>