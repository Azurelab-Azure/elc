import { ref, computed } from 'vue';
import { dataLoader } from '../engines/dataLoader';

export function useThreePhase() {
  const rules = ref<any[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const loadRules = async () => {
    loading.value = true;
    try {
      await dataLoader.loadAll();
      rules.value = dataLoader.getRulesByCategory('three-phase');
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  const motorStartRule = computed(() =>
    rules.value.find(r => r.id.includes('motor-start'))
  );

  const starDeltaRule = computed(() =>
    rules.value.find(r => r.id.includes('star-delta'))
  );

  const protectionRule = computed(() =>
    rules.value.find(r => r.id.includes('protection'))
  );

  return {
    rules,
    loading,
    error,
    loadRules,
    motorStartRule,
    starDeltaRule,
    protectionRule
  };
}