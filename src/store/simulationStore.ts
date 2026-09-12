import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSimulationStore = defineStore('simulation', () => {
  const isRunning = ref(false);
  const currentCircuit = ref<string | null>(null);
  const simulationTime = ref(0);
  const parameters = ref<Record<string, number>>({});

  const startSimulation = () => {
    isRunning.value = true;
    simulationTime.value = 0;
  };

  const stopSimulation = () => {
    isRunning.value = false;
  };

  const resetSimulation = () => {
    isRunning.value = false;
    simulationTime.value = 0;
    parameters.value = {};
  };

  const setParameter = (key: string, value: number) => {
    parameters.value[key] = value;
  };

  const loadCircuit = (circuitId: string) => {
    currentCircuit.value = circuitId;
    resetSimulation();
  };

  return {
    isRunning,
    currentCircuit,
    simulationTime,
    parameters,
    startSimulation,
    stopSimulation,
    resetSimulation,
    setParameter,
    loadCircuit
  };
});