<template>
  <div class="static-bg">
    <div class="bg-image"></div>
    <div class="bg-overlay"></div>
    <div class="bg-grid"></div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.static-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

/* 淡色图片背景 */
.bg-image {
  position: absolute;
  inset: 0;
  background-image: url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=2400&q=80&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.16;
  filter: saturate(0.6) contrast(1.05) blur(1px);
}

/* 渐变色叠加层 */
.bg-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 20% 10%, rgba(0, 113, 227, 0.12) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 90%, rgba(175, 82, 222, 0.10) 0%, transparent 55%),
    linear-gradient(180deg, var(--bg-level-0) 0%, transparent 30%, transparent 70%, var(--bg-level-0) 100%);
}

/* 科技感网格 */
.bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 113, 227, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 113, 227, 0.04) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(ellipse at center, black 20%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 20%, transparent 75%);
}

/* 深色模式调整 */
:root[data-theme='dark'] .bg-image {
  opacity: 0.10;
  filter: saturate(0.4) brightness(0.7) blur(1px);
}

:root[data-theme='dark'] .bg-grid {
  background-image:
    linear-gradient(rgba(10, 132, 255, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(10, 132, 255, 0.06) 1px, transparent 1px);
}

:root[data-theme='dark'] .bg-overlay {
  background:
    radial-gradient(ellipse at 20% 10%, rgba(10, 132, 255, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 90%, rgba(191, 90, 242, 0.12) 0%, transparent 55%),
    linear-gradient(180deg, var(--bg-level-0) 0%, transparent 30%, transparent 70%, var(--bg-level-0) 100%);
}
</style>