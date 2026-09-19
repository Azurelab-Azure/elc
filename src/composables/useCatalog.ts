import { ref } from 'vue';
import { dataLoader } from '../engines/dataLoader';
import type { TeachingItem, SimulationItem, CircuitItem } from '../engines/dataLoader';

export function useCatalog() {
  const teaching = ref<TeachingItem[]>([]);
  const simulation = ref<SimulationItem[]>([]);
  const circuits = ref<CircuitItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const initialized = ref(false);

  const load = async () => {
    if (initialized.value) return;
    loading.value = true;
    error.value = null;

    try {
      await dataLoader.loadAll();
      teaching.value = dataLoader.getTeaching();
      simulation.value = dataLoader.getSimulation();
      circuits.value = dataLoader.getCircuits();
      initialized.value = true;
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  return {
    teaching,
    simulation,
    circuits,
    loading,
    error,
    initialized,
    load
  };
}