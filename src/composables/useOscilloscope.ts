import { ref } from 'vue';

export interface WaveformChannel {
  id: string;
  name: string;
  color: string;
  visible: boolean;
  data: number[];
}

export function useOscilloscope() {
  const channels = ref<WaveformChannel[]>([]);
  const timeBase = ref(1);
  const voltageBase = ref(1);
  const triggerMode = ref<'auto' | 'normal' | 'single'>('auto');
  const triggerLevel = ref(0);
  const isRunning = ref(false);

  const addChannel = (channel: WaveformChannel) => {
    channels.value.push(channel);
  };

  const removeChannel = (id: string) => {
    channels.value = channels.value.filter(c => c.id !== id);
  };

  const toggleChannel = (id: string) => {
    const ch = channels.value.find(c => c.id === id);
    if (ch) ch.visible = !ch.visible;
  };

  const clearChannels = () => {
    channels.value = [];
  };

  return {
    channels,
    timeBase,
    voltageBase,
    triggerMode,
    triggerLevel,
    isRunning,
    addChannel,
    removeChannel,
    toggleChannel,
    clearChannels
  };
}