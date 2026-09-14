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
            <img
              v-if="circuit.thumbnail"
              :src="circuit.thumbnail"
              :alt="circuit.name"
              class="circuit-thumb-img"
            />
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
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
  :lines=[
   ' # 个人博客与 ELC 论坛运营通告

**各位读者：**
大家好，我是寅虎青蛟 Azure。今天，我要宣布一个重磅消息。
截至2026年9月3日，我的博客累计浏览量达到1263人次。这个数字虽然不算大，但背后投入的业余时间并不少。每一篇文章及资料的查资料、画图、仿真、排版都是在周末完成。即使仿真效果大量运用AI，但是原理等必须自己掌控，AI只是工具，不能代替开发，仿真页面文字部分均有人工书写及开发。
感谢大家一直以来对本博客的关注与支持，现就博客后续运营调整事宜，作如下说明。

## 一、调整背景

随着博客内容不断增多，我发现**“电”相关的内容**（包括电子、电气、电路、电力、电工等话题）在仿真环境下更有利于讲解。很多电路、波形、器件特性，单靠文字很难说清，配合仿真截图和波形图会直观很多。
同时，**图片式讲解**在受众、讨论方式和更新节奏上差异越来越大。混在一起发布，标签太杂，不利于对单方面感兴趣的朋友快速找到所需内容，也让非“电”类内容的阅读体验受到一定影响。因此，我决定对内容进行分流管理。

大家最后看到的博客版本**Hexo**架构博客，其优缺点非常明显：加功能要么依赖插件，要么自己写，而自己写还要处理兼容问题。具体来说，Hexo的痛点主要集中在以下几个方面：

- **插件冲突**：不同插件之间版本依赖经常打架，装了一个功能，可能另一个就报错，排查起来非常耗时。
- **主题兼容**：主题更新后，之前改过的样式、脚本经常失效，需要重新适配，维护成本很高。
- **迁移成本**：内容格式、图片路径、标签体系一旦想换平台，几乎等于重做一遍，很难平滑迁移。
- **功能受限**：想加评论、搜索、投稿、仿真嵌入等功能，要么找不到合适插件，要么插件年久失修，体验很差。

所以我打算先暂时下线博客域名解析服务，域名先转交给 ELC 论坛做临时内测使用。

后续博客重建完成后，所有博客内容将以 **PNG 图片格式**上传。肯定有人问为什么不用 Markdown，原因是 Markdown 的预览语法书写非常麻烦，我不想冒这个风险。（之前尝试过，以失败告终。）

## 二、具体调整

1. 与“电”有关的全部内容，将统一转移到新的论坛中发布与交流。
   包括但不限于：

   - **电子技术**：二极管、三极管、放大电路、滤波电路分析等；
   - **工厂电气**：继电器控制、电机驱动、机床分析等；
   - **电路设计**：原理图绘制、接线图绘制等；
   - **电工实操**：接线、测量、安全规范仿真等；
   以上内容都会统一转移到新论坛。

2. 其余内容暂停更新，并将在 **10 月之前**迁移到 ELC 项目的子文件夹，届时会在 ELC 主页发布文件夹名称。

3. 新论坛目前仍处于内测和开发阶段，数据存在问题，图片、元器件等素材还在绘制中（我们只有周末时间）。内测期间可能会有访问不稳定、数据丢失、页面错位等情况，请大家多多包涵，也欢迎随时反馈问题。

## 三、新论坛规划

说实话，我只是一个，没有考虑得那么周全，也没能力一上来就做得很完善。新论坛目前的想法很朴素，就是希望给“电”类内容一个能讨论、能交流的地方。规划中的功能包括：

1. **在线仿真器**：想做成类似 NB 实验的仿真环境，支持电路搭建、波形查看，方便讨论时直接附上可运行的案例。不过这个还在摸索，能不能做出来、做到什么程度，我也不敢保证。由于水平限制，这部分我们交给AI完成，但AI这离谱的冗余让我们感到堪忧。
2. **在线题库**：分享相关题目，做一个题库。
3. **在线投稿**：读者可以提交自己的笔记、教程、项目记录，审核后发布，算是大家一起共建。
4. **资料库**：整理常用元器件手册、参考电路、工具软件等资源，方便查阅。
5. **内测计划**：先小范围邀请测试，重点看能不能正常发帖、数据会不会丢、仿真能不能跑；稳定后再慢慢开放注册。
6. **开放时间**：具体时间取决于内测进度，会在 ELC 主页和原有渠道同步通知。

这些只是初步想法，实际做起来肯定会有调整，也可能砍掉一些功能。毕竟时间、精力、能力都有限，只能一步一步来。

## 四、联系与反馈

如有疑问、建议，或发现内容归类有误，欢迎通过原有渠道联系我们。我会尽量及时回复。
再次感谢大家的理解与支持。博客暂时告一段落，但内容不会停，只是换一个更适合交流的地方继续生长。我们论坛见。

联系方式：chzurelab@outlook.com

**Azure_Lab**
**2026-09**'
  
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
