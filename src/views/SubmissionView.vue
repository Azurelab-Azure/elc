<template>
  <div class="page">
    <header class="page-header">
      <h1 class="page-title">投稿中心</h1>
      <p class="page-desc">投稿到 beta/ 数据区</p>
    </header>

    <div v-if="submitted" class="success-card">
      <div class="success-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>
      <h2 class="success-title">投稿已提交</h2>
      <p class="success-desc">感谢您的贡献，我们会尽快审核</p>
      <button class="btn-primary" @click="reset">再次投稿</button>
    </div>

    <form v-else class="form" @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="form-field">
          <label class="form-label">标题</label>
          <input v-model="form.title" type="text" class="form-input" placeholder="输入电路或文档标题" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-field">
          <label class="form-label">描述</label>
          <textarea v-model="form.description" class="form-textarea" placeholder="简要描述您的内容"></textarea>
        </div>
      </div>

      <div class="form-grid">
        <div class="form-field">
          <label class="form-label">类型</label>
          <select v-model="form.type" class="form-input">
            <option value="circuit">电路图</option>
            <option value="document">文档</option>
          </select>
        </div>
        <div class="form-field">
          <label class="form-label">分类</label>
          <select v-model="form.category" class="form-input">
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>
        </div>
      </div>

      <div class="form-field">
        <label class="form-label">上传文件</label>
        <div
          class="upload-zone"
          @click="triggerUpload"
          @dragover.prevent
          @drop.prevent="handleDrop"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
          <p class="upload-text">拖拽文件到此处，或点击选择</p>
          <p class="upload-hint">支持 HTML, MD, PDF, PNG 格式</p>
        </div>
        <input ref="fileInput" type="file" class="hidden-input" accept=".html,.md,.pdf,.png" @change="handleFileChange" />

        <div v-if="form.files.length > 0" class="file-list">
          <div v-for="(file, index) in form.files" :key="index" class="file-item">
            <span class="file-name">{{ file.name }}</span>
            <button type="button" class="file-remove" @click="removeFile(index)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="form-grid">
        <div class="form-field">
          <label class="form-label">邮箱</label>
          <input v-model="form.email" type="email" class="form-input" placeholder="your@email.com" />
        </div>
        <div class="form-field">
          <label class="form-label">微信号（可选）</label>
          <input v-model="form.wechat" type="text" class="form-input" placeholder="微信" />
        </div>
      </div>

      <div v-if="error" class="error-box">{{ error }}</div>

      <button type="submit" class="btn-primary btn-block" :disabled="submitting">
        {{ submitting ? '提交中...' : '提交投稿' }}
      </button>
    </form>

    <DockBar />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DockBar from '../components/common/DockBar.vue';
import { useSubmission } from '../composables/useSubmission';
import { useCatalog } from '../composables/useCatalog';

const fileInput = ref<HTMLInputElement | null>(null);

const { form, submitting, submitted, error, addFile, removeFile, submit, reset } = useSubmission();
const { categories, load } = useCatalog();

const triggerUpload = () => {
  fileInput.value?.click();
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    Array.from(target.files).forEach(addFile);
  }
};

const handleDrop = (event: DragEvent) => {
  const files = event.dataTransfer?.files;
  if (files) {
    Array.from(files).forEach(addFile);
  }
};

const handleSubmit = async () => {
  await submit();
};

onMounted(load);
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

.form {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-row {
  display: flex;
  gap: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.form-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-gray-600);
  letter-spacing: -0.01em;
}

.form-input,
.form-textarea {
  padding: 12px 16px;
  background: var(--color-gray-50);
  border: 1px solid var(--color-gray-200);
  border-radius: 12px;
  font-size: 14px;
  color: var(--color-gray-700);
  outline: none;
  transition: all 0.2s ease;
  font-family: inherit;
  width: 100%;
}

.form-input:focus,
.form-textarea:focus {
  border-color: var(--color-blue);
  background: white;
  box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.1);
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
  line-height: 1.5;
}

.upload-zone {
  padding: 40px 24px;
  border: 2px dashed var(--color-gray-300);
  border-radius: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.25s ease;
}

.upload-zone:hover {
  border-color: var(--color-blue);
  background: rgba(0, 113, 227, 0.02);
}

.upload-zone svg {
  width: 48px;
  height: 48px;
  color: var(--color-gray-400);
  margin-bottom: 16px;
}

.upload-text {
  font-size: 15px;
  color: var(--color-gray-600);
  margin-bottom: 6px;
}

.upload-hint {
  font-size: 13px;
  color: var(--color-gray-400);
}

.hidden-input {
  display: none;
}

.file-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
}

.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: var(--color-gray-50);
  border-radius: 10px;
}

.file-name {
  font-size: 14px;
  color: var(--color-gray-700);
}

.file-remove {
  color: var(--color-red);
  padding: 4px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.file-remove:hover {
  background: rgba(255, 59, 48, 0.1);
}

.file-remove svg {
  width: 16px;
  height: 16px;
}

.error-box {
  padding: 12px 16px;
  background: rgba(255, 59, 48, 0.08);
  color: var(--color-red);
  border-radius: 10px;
  font-size: 14px;
}

.btn-primary {
  padding: 14px 28px;
  background: var(--color-blue);
  color: white;
  border-radius: 980px;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.25s ease;
  letter-spacing: -0.01em;
}

.btn-primary:hover:not(:disabled) {
  background: var(--color-blue-hover);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-block {
  width: 100%;
}

.success-card {
  background: white;
  border-radius: 20px;
  padding: 80px 40px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.success-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  border-radius: 50%;
  background: rgba(52, 199, 89, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.success-icon svg {
  width: 40px;
  height: 40px;
  color: var(--color-green);
}

.success-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-gray-700);
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}

.success-desc {
  font-size: 15px;
  color: var(--color-gray-500);
  margin-bottom: 32px;
}

@media (max-width: 640px) {
  .page {
    padding: 60px 16px 120px;
  }

  .form {
    padding: 24px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}


</style>