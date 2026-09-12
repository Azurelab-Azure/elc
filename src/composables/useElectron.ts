import { ref } from 'vue';

export function useElectron() {
  const isElectron = ref(
    typeof window !== 'undefined' && 
    typeof (window as any).electronAPI !== 'undefined'
  );

  const minimize = () => {
    if (isElectron.value) {
      (window as any).electronAPI.minimize();
    }
  };

  const maximize = () => {
    if (isElectron.value) {
      (window as any).electronAPI.maximize();
    }
  };

  const close = () => {
    if (isElectron.value) {
      (window as any).electronAPI.close();
    }
  };

  const saveFile = async (content: string, defaultPath: string) => {
    if (isElectron.value) {
      return (window as any).electronAPI.saveFile(content, defaultPath);
    }
    return null;
  };

  const openFile = async () => {
    if (isElectron.value) {
      return (window as any).electronAPI.openFile();
    }
    return null;
  };

  return {
    isElectron,
    minimize,
    maximize,
    close,
    saveFile,
    openFile
  };
}