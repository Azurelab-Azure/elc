import { defineStore } from 'pinia';
import { ref } from 'vue';
import { dataLoader } from '../engines/dataLoader';
import type { CircuitItem, DocumentItem, Category } from '../engines/dataLoader';

export const useCatalogStore = defineStore('catalog', () => {
  const circuits = ref<CircuitItem[]>([]);
  const documents = ref<DocumentItem[]>([]);
  const categories = ref<Category[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const initialized = ref(false);

  const load = async () => {
    if (initialized.value) return;
    loading.value = true;
    error.value = null;

    try {
      await dataLoader.loadAll();
      circuits.value = dataLoader.getCircuits();
      documents.value = dataLoader.getDocuments();
      categories.value = dataLoader.getCategories();
      initialized.value = true;
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  const getCircuitById = (id: string) => {
    return circuits.value.find(c => c.id === id);
  };

  const getDocumentById = (id: string) => {
    return documents.value.find(d => d.id === id);
  };

  return {
    circuits,
    documents,
    categories,
    loading,
    error,
    initialized,
    load,
    getCircuitById,
    getDocumentById
  };
});