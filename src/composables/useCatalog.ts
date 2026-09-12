import { ref, computed } from 'vue';
import { dataLoader } from '../engines/dataLoader';
import type { CircuitItem, DocumentItem, Category } from '../engines/dataLoader';

export function useCatalog() {
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

  const circuitsByCategory = (category: string) => computed(() => {
    if (category === 'all') return circuits.value;
    return circuits.value.filter(c => c.category === category);
  });

  const documentsByType = (type: string) => computed(() => {
    if (type === 'all') return documents.value;
    return documents.value.filter(d => d.type === type);
  });

  const searchCircuits = (query: string) => computed(() => {
    if (!query) return circuits.value;
    const q = query.toLowerCase();
    return circuits.value.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  });

  const searchDocuments = (query: string) => computed(() => {
    if (!query) return documents.value;
    const q = query.toLowerCase();
    return documents.value.filter(d =>
      d.title.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q)
    );
  });

  return {
    circuits,
    documents,
    categories,
    loading,
    error,
    initialized,
    load,
    circuitsByCategory,
    documentsByType,
    searchCircuits,
    searchDocuments
  };
}