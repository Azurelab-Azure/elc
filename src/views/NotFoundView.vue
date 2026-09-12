<template>
  <div class="page">
    <div class="content">
      <div class="code">404</div>
      <h1 class="title">页面不存在</h1>
      <p class="desc">您访问的页面可能已被移除或不存在</p>
      <div class="actions">
        <router-link to="/" class="btn-primary">返回首页</router-link>
        <button class="btn-secondary" @click="goBack">返回上一页</button>
      </div>
    </div>

    <DockBar />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import DockBar from '../components/common/DockBar.vue';

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<style scoped>


.content {
  text-align: center;
  max-width: 480px;
}

.code {
  font-size: clamp(80px, 15vw, 160px);
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 1;
  background: linear-gradient(135deg, #0071e3 0%, #af52de 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 24px;
}

.title {
  font-size: 28px;
  font-weight: 600;
  color: var(--color-gray-700);
  letter-spacing: -0.025em;
  margin-bottom: 12px;
}

.desc {
  font-size: 16px;
  color: var(--color-gray-500);
  margin-bottom: 40px;
}

.actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary {
  padding: 12px 28px;
  background: var(--color-blue);
  color: white;
  border-radius: 980px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.25s ease;
}

.btn-primary:hover {
  background: var(--color-blue-hover);
  opacity: 1;
}

.btn-secondary {
  padding: 12px 28px;
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

@media (max-width: 640px) {
  .page {
    padding: 40px 20px 120px;
  }
}


</style>