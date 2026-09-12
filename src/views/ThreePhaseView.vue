<template>
  <div class="page">
    <header class="page-header">
      <h1 class="page-title">三相电</h1>
      <p class="page-desc">基于 rules/three-phase 规则驱动</p>
    </header>

    <div v-if="loading" class="state-loading">
      <div class="spinner"></div>
    </div>

    <div v-else class="layout">
      <!-- 规则面板 -->
      <section class="panel">
        <h2 class="panel-title">规则</h2>

        <div v-if="rules.length === 0" class="empty">
          <p class="empty-title">暂无三相电规则</p>
          <p class="empty-desc">请将规则 JSON 放到 rules/three-phase/ 目录</p>
        </div>

        <div v-else class="rule-list">
          <div v-for="rule in rules" :key="rule.id" class="rule-item">
            <div class="rule-head">
              <h3 class="rule-name">{{ rule.name }}</h3>
              <span class="rule-badge">{{ rule.parameters ? Object.keys(rule.parameters).length : 0 }}</span>
            </div>
            <p class="rule-desc">{{ rule.description }}</p>
            <div v-if="rule.parameters" class="params">
              <span v-for="(value, key) in rule.parameters" :key="key" class="param">
                <span class="param-key">{{ key }}</span>
                <span class="param-value">{{ value }}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- 电路面板 -->
      <section class="panel">
        <h2 class="panel-title">电路</h2>

        <div v-if="threePhaseCircuits.length === 0" class="empty">
          <p class="empty-title">暂无三相电电路</p>
          <p class="empty-desc">请将 HTML 文件放到 beta/circuits/three-phase/ 目录</p>
        </div>

        <div v-else class="circuit-list">
          <router-link
            v-for="circuit in threePhaseCircuits"
            :key="circuit.id"
            :to="`/circuit/${circuit.id}`"
            class="circuit-item"
          >
            <div class="circuit-body">
              <h3 class="circuit-name">{{ circuit.name }}</h3>
              <p class="circuit-desc">{{ circuit.description }}</p>
            </div>
            <svg class="circuit-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 5l7 7-7 7"/>
            </svg>
          </router-link>
        </div>
      </section>
    </div>

    <DockBar />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import DockBar from '../components/common/DockBar.vue';
import { useThreePhase } from '../composables/useThreePhase';
import { useCatalog } from '../composables/useCatalog';

const { rules, loading, loadRules } = useThreePhase();
const { circuits, load } = useCatalog();

const threePhaseCircuits = computed(() =>
  circuits.value.filter(c => c.category === 'three-phase')
);

onMounted(async () => {
  await load();
  await loadRules();
});
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.panel {
  background: var(--bg-level-1);
  border-radius: var(--radius-xl);
  padding: 28px;
  border: 1px solid var(--border-subtle);
  transition: background-color 0.25s ease, border-color 0.25s ease;
}

.panel-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 20px;
}

/* 规则列表 */
.rule-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rule-item {
  padding: 16px 18px;
  background: var(--bg-level-2);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  transition: all 0.2s ease;
}

.rule-item:hover {
  border-color: var(--border-default);
}

.rule-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.rule-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.015em;
}

.rule-badge {
  font-size: 11px;
  font-weight: 600;
  font-family: var(--font-mono);
  color: var(--text-tertiary);
  background: var(--bg-level-3);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
}

.rule-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 12px;
}

.params {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.param {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: var(--bg-level-1);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  font-size: 11px;
  font-family: var(--font-mono);
  line-height: 1.4;
}

.param-key {
  color: var(--text-tertiary);
}

.param-value {
  color: var(--text-primary);
  font-weight: 600;
}

/* 电路列表 */
.circuit-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.circuit-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 18px;
  background: var(--bg-level-2);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
}

.circuit-item:hover {
  background: var(--bg-hover);
  border-color: var(--border-default);
  opacity: 1;
}

.circuit-body {
  flex: 1;
  min-width: 0;
}

.circuit-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.015em;
  margin-bottom: 3px;
}

.circuit-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.circuit-arrow {
  width: 16px;
  height: 16px;
  color: var(--text-quaternary);
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.circuit-item:hover .circuit-arrow {
  color: var(--color-blue);
  transform: translateX(2px);
}

/* 空状态 */
.empty {
  text-align: center;
  padding: 48px 20px;
}

.empty-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.empty-desc {
  font-size: 12px;
  color: var(--text-tertiary);
}

/* 加载 */
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
  }
}

@media (max-width: 640px) {
  .panel {
    padding: 20px;
  }
}
</style>