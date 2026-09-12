import { ref, computed } from 'vue';

export function useSimulation() {
  const isRunning = ref(false);
  const currentTime = ref(0);
  const timeStep = ref(0.001);
  const parameters = ref<Record<string, number>>({});

  const start = () => {
    isRunning.value = true;
  };

  const stop = () => {
    isRunning.value = false;
  };

  const reset = () => {
    isRunning.value = false;
    currentTime.value = 0;
    parameters.value = {};
  };

  const setParameter = (key: string, value: number) => {
    parameters.value[key] = value;
  };

  const getParameter = (key: string): number => {
    return parameters.value[key] ?? 0;
  };

  const elapsedTime = computed(() => currentTime.value.toFixed(3));

  return {
    isRunning,
    currentTime,
    timeStep,
    parameters,
    start,
    stop,
    reset,
    setParameter,
    getParameter,
    elapsedTime
  };
}