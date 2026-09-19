<template>
  <div class="page">
    <section class="hero">
      <div class="hero-badge">
        <AppIcon name="lightning" :size="14" />
        <span>电路仿真实验室</span>
      </div>
      <h1 class="hero-title">
        探索电路世界
        <br />
        <span class="hero-gradient">从仿真开始</span>
      </h1>
      <p class="hero-desc">
        三相电、PLC、示波器、在线绘制，一站式电路仿真平台。让复杂的电路变得直观易懂。
      </p>
      <div class="hero-actions">
        <router-link to="/simulation" class="btn-primary">
          <AppIcon name="play" :size="18" />
          开始仿真
        </router-link>
        <router-link to="/teaching" class="btn-glass">
          <AppIcon name="teaching" :size="18" />
          学习电路
        </router-link>
      </div>
    </section>

    <section class="grid-section">
      <router-link
        v-for="item in entries"
        :key="item.path"
        :to="item.path"
        class="entry-card glass"
      >
        <div class="entry-icon" :style="{ background: item.color }">
          <AppIcon :name="item.icon" :size="24" />
        </div>
        <h3 class="entry-title">{{ item.title }}</h3>
        <p class="entry-desc">{{ item.desc }}</p>
        <span class="entry-arrow">
          <AppIcon name="arrowRight" :size="18" />
        </span>
      </router-link>
    </section>

    <section class="stats-section">
      <div class="stat-item glass">
        <div class="stat-value">{{ counts.teaching }}</div>
        <div class="stat-label">教学文档</div>
      </div>
      <div class="stat-item glass">
        <div class="stat-value">{{ counts.simulation }}</div>
        <div class="stat-label">仿真电路</div>
      </div>
      <div class="stat-item glass">
        <div class="stat-value">{{ counts.circuits }}</div>
        <div class="stat-label">电路图</div>
      </div>
    </section>

    <AnnouncementModal
      title="博客与 ELC 论坛运营通告"
      :lines="announcementLines"
      :actions="announcementActions"
      version="2026-09-19"
      storage-key="csl-home-announce"
      :delay="800"
    />

    <DockBar />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import DockBar from '../components/common/DockBar.vue';
import AppIcon from '../components/common/AppIcon.vue';
import AnnouncementModal from '../components/home/AnnouncementModal.vue';
import { useCatalog } from '../composables/useCatalog';
import type { IconName } from '../utils/icons';

const { teaching, simulation, circuits, load } = useCatalog();

interface Entry {
  path: string;
  title: string;
  desc: string;
  icon: IconName;
  color: string;
}

const entries: Entry[] = [
  {
    path: '/teaching',
    title: '电路教学',
    desc: '从基础到进阶的电路知识',
    icon: 'teaching',
    color: 'linear-gradient(135deg, #0071e3, #0a84ff)'
  },
  {
    path: '/simulation',
    title: '电路仿真',
    desc: '实时仿真与波形测量',
    icon: 'simulation',
    color: 'linear-gradient(135deg, #af52de, #bf5af2)'
  },
  {
    path: '/circuit',
    title: '电路图',
    desc: '浏览与绘制电路图',
    icon: 'circuit',
    color: 'linear-gradient(135deg, #34c759, #30d158)'
  },
  {
    path: '/about',
    title: '关于',
    desc: '项目介绍与开源协议',
    icon: 'about',
    color: 'linear-gradient(135deg, #ff9500, #ff9f0a)'
  }
];

const counts = computed(() => ({
  teaching: teaching.value.length,
  simulation: simulation.value.length,
  circuits: circuits.value.length
}));

const announcementLines = [
  '与「电」相关的内容将统一转移到 ELC 论坛发布与交流。',
  '其余内容将在 10 月之前迁移到 ELC 项目子文件夹。',
  '新论坛内测中，欢迎反馈问题。'
];

const announcementActions = [
  { label: '开始探索', primary: true }
];

onMounted(load);
</script>

<style scoped>
.hero {
  max-width: 900px;
  margin: 0 auto 100px;
  text-align: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: var(--glass-bg-strong);
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-pill);
  font-size: 13px;
  font-weight: 600;
  color: var(--color-blue);
  margin-bottom: 28px;
  letter-spacing: -0.01em;
}

.hero-title {
  font-size: clamp(48px, 7vw, 96px);
  font-weight: 800;
  line-height: 1.02;
  letter-spacing: -0.045em;
  color: var(--text-primary);
  margin-bottom: 28px;
}

.hero-gradient {
  background: linear-gradient(135deg, #0071e3 0%, #af52de 50%, #34c759 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-desc {
  font-size: 20px;
  line-height: 1.55;
  color: var(--text-secondary);
  margin-bottom: 44px;
  letter-spacing: -0.01em;
  font-weight: 500;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  background: var(--color-blue);
  color: white;
  border-radius: var(--radius-pill);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.01em;
  transition: all 0.25s ease;
  box-shadow:
    0 0 0 1px rgba(0, 113, 227, 0.1),
    0 12px 32px rgba(0, 113, 227, 0.35),
    0 4px 12px rgba(0, 113, 227, 0.2);
}

.btn-primary:hover {
  background: var(--color-blue-hover);
  transform: translateY(-2px);
  box-shadow:
    0 0 0 1px rgba(0, 113, 227, 0.15),
    0 20px 48px rgba(0, 113, 227, 0.45),
    0 8px 20px rgba(0, 113, 227, 0.3);
  opacity: 1;
}

.btn-glass {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  background: var(--glass-bg-strong);
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
  color: var(--text-primary);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-pill);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.01em;
  transition: all 0.25s ease;
  box-shadow: var(--glass-shadow);
}

.btn-glass:hover {
  background: var(--glass-bg);
  transform: translateY(-2px);
  opacity: 1;
}

.grid-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 60px;
}

.entry-card {
  position: relative;
  padding: 32px 28px;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  min-height: 220px;
  overflow: hidden;
}

.entry-icon {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  color: white;
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
}

.entry-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.025em;
  margin-bottom: 6px;
}

.entry-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
  font-weight: 500;
  flex: 1;
}

.entry-arrow {
  position: absolute;
  top: 32px;
  right: 28px;
  color: var(--text-tertiary);
  transition: all 0.3s ease;
}

.entry-card:hover .entry-arrow {
  color: var(--color-blue);
  transform: translateX(4px);
}

.stats-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.stat-item {
  padding: 32px;
  text-align: center;
}

.stat-value {
  font-size: 42px;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.04em;
  margin-bottom: 6px;
  line-height: 1;
}

.stat-label {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
}

@media (max-width: 1024px) {
  .grid-section {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .grid-section {
    grid-template-columns: 1fr;
  }

  .stats-section {
    grid-template-columns: 1fr;
  }

  .hero {
    margin-bottom: 60px;
  }
}
</style>