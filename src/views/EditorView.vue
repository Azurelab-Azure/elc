<template>
  <div class="page">
    <header class="page-header">
      <div>
        <h1 class="page-title">在线绘制</h1>
        <p class="page-desc">电路图在线绘制与导出</p>
      </div>
      <div class="header-actions">
        <button class="btn-secondary" @click="clearCanvas">清空</button>
        <button class="btn-primary">导出</button>
      </div>
    </header>

    <div class="editor">
      <aside class="editor-sidebar">
        <h2 class="sidebar-title">元件库</h2>
        <div v-if="elements.length === 0" class="sidebar-empty">
          <p>暂无元件图标</p>
          <p class="sidebar-empty-sub">请将 SVG 文件放到 public/element-icons/ 目录</p>
        </div>
        <div v-else class="element-list">
          <div
            v-for="element in elements"
            :key="element.name"
            class="element-item"
            draggable="true"
            @dragstart="handleDragStart($event, element)"
          >
            <img :src="element.icon" :alt="element.name" class="element-icon" />
            <span class="element-name">{{ element.name }}</span>
          </div>
        </div>
      </aside>

      <div class="editor-canvas">
        <div
          class="canvas-area"
          @dragover.prevent
          @drop="handleDrop"
        >
          <div class="canvas-grid"></div>

          <div
            v-for="item in placedItems"
            :key="item.id"
            class="placed-item"
            :style="{ left: item.x + 'px', top: item.y + 'px' }"
            @mousedown="startDrag(item, $event)"
          >
            <img :src="item.icon" :alt="item.name" />
            <span>{{ item.name }}</span>
          </div>

          <div v-if="placedItems.length === 0" class="canvas-empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            <p>从左侧拖拽元件到画布</p>
          </div>
        </div>
      </div>
    </div>

    <DockBar />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DockBar from '../components/common/DockBar.vue';

interface ElementItem {
  id: string;
  name: string;
  icon: string;
  x: number;
  y: number;
}

const elements = ref<Array<{ name: string; icon: string }>>([]);
const placedItems = ref<ElementItem[]>([]);
let dragItem: ElementItem | null = null;

const loadElementIcons = () => {
  const iconModules = import.meta.glob('/public/element-icons/*.svg', { as: 'url' });
  const loaded: Array<{ name: string; icon: string }> = [];

  for (const path in iconModules) {
    const fileName = path.split('/').pop()?.replace('.svg', '') || '';
    loaded.push({
      name: fileName.replace(/-/g, ' '),
      icon: (iconModules[path] as string).replace('/public', '')
    });
  }

  elements.value = loaded;
};

const handleDragStart = (event: DragEvent, element: { name: string; icon: string }) => {
  event.dataTransfer?.setData('element', JSON.stringify(element));
};

const handleDrop = (event: DragEvent) => {
  const data = event.dataTransfer?.getData('element');
  if (!data) return;

  const element = JSON.parse(data);
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();

  placedItems.value.push({
    id: `el-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name: element.name,
    icon: element.icon,
    x: event.clientX - rect.left - 40,
    y: event.clientY - rect.top - 20
  });
};

const startDrag = (item: ElementItem, event: MouseEvent) => {
  dragItem = item;
  const startX = event.clientX;
  const startY = event.clientY;
  const origX = item.x;
  const origY = item.y;

  const handleMouseMove = (e: MouseEvent) => {
    if (dragItem) {
      dragItem.x = origX + e.clientX - startX;
      dragItem.y = origY + e.clientY - startY;
    }
  };

  const handleMouseUp = () => {
    dragItem = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
};

const clearCanvas = () => {
  placedItems.value = [];
};

onMounted(loadElementIcons);
</script>

<style scoped>


.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 40px;
  gap: 24px;
  flex-wrap: wrap;
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

.header-actions {
  display: flex;
  gap: 12px;
}

.btn-primary {
  padding: 12px 24px;
  background: var(--color-blue);
  color: white;
  border-radius: 980px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.25s ease;
}

.btn-primary:hover {
  background: var(--color-blue-hover);
}

.btn-secondary {
  padding: 12px 24px;
  background: white;
  color: var(--color-gray-700);
  border: 1px solid var(--color-gray-200);
  border-radius: 980px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.25s ease;
}

.btn-secondary:hover {
  background: var(--color-gray-100);
}

.editor {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 20px;
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.editor-sidebar {
  border-right: 1px solid var(--color-gray-200);
  padding-right: 20px;
}

.sidebar-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-gray-400);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 16px;
}

.sidebar-empty {
  text-align: center;
  padding: 32px 0;
}

.sidebar-empty p {
  font-size: 13px;
  color: var(--color-gray-400);
}

.sidebar-empty-sub {
  font-size: 11px;
  color: var(--color-gray-300);
  margin-top: 6px;
}

.element-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.element-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: grab;
  transition: all 0.2s ease;
}

.element-item:hover {
  background: var(--color-gray-100);
}

.element-item:active {
  cursor: grabbing;
}

.element-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.element-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-gray-700);
}

.editor-canvas {
  min-height: 600px;
}

.canvas-area {
  position: relative;
  height: 600px;
  background: var(--color-gray-50);
  border-radius: 14px;
  overflow: hidden;
}

.canvas-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.04) 1px, transparent 1px);
  background-size: 24px 24px;
}

.placed-item {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: white;
  border: 1px solid var(--color-gray-200);
  border-radius: 10px;
  cursor: move;
  user-select: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s ease;
}

.placed-item:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.placed-item img {
  width: 18px;
  height: 18px;
}

.placed-item span {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-gray-700);
}

.canvas-empty {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-gray-400);
  gap: 16px;
}

.canvas-empty svg {
  width: 64px;
  height: 64px;
  opacity: 0.4;
}

.canvas-empty p {
  font-size: 14px;
}

@media (max-width: 900px) {
  .editor {
    grid-template-columns: 1fr;
  }

  .editor-sidebar {
    border-right: none;
    border-bottom: 1px solid var(--color-gray-200);
    padding-right: 0;
    padding-bottom: 20px;
  }

  .element-list {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

@media (max-width: 640px) {
  .page {
    padding: 60px 16px 120px;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .canvas-area {
    height: 480px;
  }
}

 
</style>