import { ref } from 'vue';

export interface SubmissionForm {
  title: string;
  description: string;
  type: 'circuit' | 'document';
  category: string;
  email: string;
  wechat: string;
  files: File[];
}

export function useSubmission() {
  const form = ref<SubmissionForm>({
    title: '',
    description: '',
    type: 'circuit',
    category: '',
    email: '',
    wechat: '',
    files: []
  });

  const submitting = ref(false);
  const submitted = ref(false);
  const error = ref<string | null>(null);

  const addFile = (file: File) => {
    form.value.files.push(file);
  };

  const removeFile = (index: number) => {
    form.value.files.splice(index, 1);
  };

  const clearFiles = () => {
    form.value.files = [];
  };

  const validate = (): boolean => {
    if (!form.value.title.trim()) {
      error.value = '标题不能为空';
      return false;
    }
    if (!form.value.description.trim()) {
      error.value = '描述不能为空';
      return false;
    }
    if (form.value.files.length === 0) {
      error.value = '请至少上传一个文件';
      return false;
    }
    error.value = null;
    return true;
  };

  const submit = async () => {
    if (!validate()) return false;

    submitting.value = true;
    error.value = null;

    try {
      // 实际提交逻辑：调用 GitHub API 或后端接口
      // 这里只做状态处理
      await new Promise(resolve => setTimeout(resolve, 500));
      submitted.value = true;
      return true;
    } catch (err) {
      error.value = (err as Error).message;
      return false;
    } finally {
      submitting.value = false;
    }
  };

  const reset = () => {
    form.value = {
      title: '',
      description: '',
      type: 'circuit',
      category: '',
      email: '',
      wechat: '',
      files: []
    };
    submitted.value = false;
    error.value = null;
  };

  return {
    form,
    submitting,
    submitted,
    error,
    addFile,
    removeFile,
    clearFiles,
    validate,
    submit,
    reset
  };
}