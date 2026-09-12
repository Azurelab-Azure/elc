import { ref, computed } from 'vue';
import { dataLoader } from '../engines/dataLoader';

export function usePLC() {
  const rules = ref<any[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const loadRules = async () => {
    loading.value = true;
    try {
      await dataLoader.loadAll();
      rules.value = dataLoader.getRulesByCategory('plc');
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  const ladderLogicRule = computed(() =>
    rules.value.find(r => r.id.includes('ladder-logic'))
  );

  const timersRule = computed(() =>
    rules.value.find(r => r.id.includes('timers'))
  );

  const countersRule = computed(() =>
    rules.value.find(r => r.id.includes('counters'))
  );

  return {
    rules,
    loading,
    error,
    loadRules,
    ladderLogicRule,
    timersRule,
    countersRule
  };
}