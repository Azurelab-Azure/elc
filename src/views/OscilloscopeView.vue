<template>
  <div class="page">
    <header class="page-header">
      <h1 class="page-title">示波器</h1>
      <p class="page-desc">实时波形测量与分析</p>
    </header>

    <section class="scope">
      <div class="scope-screen">
        <div class="scope-toolbar">
          <div class="traffic-lights">
            <span class="light light-red"></span>
            <span class="light light-yellow"></span>
            <span class="light light-green"></span>
          </div>
          <div class="scope-status">
            <span v-for="ch in channels" :key="ch.id" class="status-item">
              <span class="status-dot" :style="{ background: ch.visible ? ch.color : '#424245' }"></span>
              {{ ch.name }}
            </span>
          </div>
        </div>

        <div class="scope-canvas">
          <svg viewBox="0 0 800 320" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2d2d2f" stroke-width="0.5"/>
              </pattern>
            </defs>
            <rect width="800" height="320" fill="url(#grid)" />

            <path
              v-for="ch in visibleChannels"
              :key="ch.id"
              :d="generatePath(ch.data)"
              fill="none"
              :stroke="ch.color"
              stroke-width="2"
            />
          </svg>
        </div>
      </div>

      <div class="scope-controls">
        <div class="control-group">
          <label class="control-label">时间/格</label>
          <select v-model="timeBase" class="control-select">
            <option :value="1">1ms</option>
            <option :value="5">5ms</option>
            <option :value="10">10ms</option>
            <option :value="50">50ms</option>
          </select>
        </div>

        <div class="control-group">
          <label class="control-label">电压/格</label>
          <select v-model="voltageBase" class="control-select">
            <option :value="0.1">100mV</option>
            <option :value="0.5">500mV</option>
            <option :value="1">1V</option>
            <option :value="5">5V</option>
          </select>
        </div>

        <div class="control-group">
          <label class="control-label">触发</label>
          <select v-model="triggerMode" class="control-select">
            <option value="auto">自动</option>
            <option value="normal">正常</option>
            <option value="single">单次</option>
          </select>
        </div>

        <div class="control-group">
          <label class="control-label">通道</label>
          <div class="channel-buttons">
            <button
              v-for="ch in channels"
              :key="ch.id"
              class="channel-btn"
              :class="{ 'channel-btn-active': ch.visible }"
              :style="ch.visible ? { borderColor: ch.color, color: ch.color } : {}"
              @click="toggleChannel(ch.id)"
            >
              {{ ch.name }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <DockBar />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import DockBar from '../components/common/DockBar.vue';
import { useOscilloscope } from '../composables/useOscilloscope';

const {
  channels,
  timeBase,
  voltageBase,
  triggerMode,
  toggleChannel,
  addChannel
} = useOscilloscope();

const visibleChannels = computed(() => channels.value.filter(c => c.visible));

const generatePath = (data: number[]): string => {
  if (!data || data.length === 0) return '';
  const width = 800;
  const height = 320;
  const step = width / (data.length - 1);
  return data.map((v, i) => {
    const x = i * step;
    const y = height / 2 - v * 60;
    return `${i === 0 ? 'M' : 'L'}${x},${y}`;
  }).join(' ');
};

onMounted(() => {
  if (channels.value.length === 0) {
    const sineData = Array.from({ length: 100 }, (_, i) => Math.sin(i / 10) * 0.8);
    const cosData = Array.from({ length: 100 }, (_, i) => Math.cos(i / 10) * 0.6);
    addChannel({ id: 'ch1', name: 'CH1', color: '#34c759', visible: true, data: sineData });
    addChannel({ id: 'ch2', name: 'CH2', color: '#0071e3', visible: true, data: cosData });
  }
});
</script>

<style scoped>


.page-header {
  margin-bottom: 60px;
}

.page-title {
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--color-gray-700);
  line-height: 1.1;
  margin-bottom: 12px;
}

.page-desc {
  font-size: 19px;
  color: var(--color-gray-500);
}

.scope {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.scope-screen {
  background: #1d1d1f;
  padding: 16px;
}

.scope-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
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

.scope-status {
  display: flex;
  gap: 16px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: #86868b;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.scope-canvas {
  background: #000;
  border-radius: 10px;
  overflow: hidden;
  aspect-ratio: 800 / 320;
}

.scope-canvas svg {
  width: 100%;
  height: 100%;
  display: block;
}

.scope-controls {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding: 24px 28px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-gray-500);
  letter-spacing: -0.01em;
}

.control-select {
  padding: 10px 14px;
  background: var(--color-gray-50);
  border: 1px solid var(--color-gray-200);
  border-radius: 10px;
  font-size: 14px;
  color: var(--color-gray-700);
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.control-select:focus {
  border-color: var(--color-blue);
}

.channel-buttons {
  display: flex;
  gap: 6px;
}

.channel-btn {
  flex: 1;
  padding: 10px;
  background: var(--color-gray-50);
  border: 1.5px solid var(--color-gray-200);
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-gray-500);
  transition: all 0.2s ease;
  font-family: var(--font-mono);
}

.channel-btn:hover {
  background: var(--color-gray-100);
}

.channel-btn-active {
  background: white;
  border-width: 1.5px;
}

@media (max-width: 900px) {
  .scope-controls {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .page {
    padding: 60px 20px 120px;
  }

  .scope-controls {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 20px;
  }
}


</style>