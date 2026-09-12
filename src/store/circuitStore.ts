import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { EditorElement, EditorWire } from '../composables/useCircuitEditor';

export const useCircuitStore = defineStore('circuit', () => {
  const elements = ref<EditorElement[]>([]);
  const wires = ref<EditorWire[]>([]);
  const selectedElement = ref<string | null>(null);
  const canvasSize = ref({ width: 1200, height: 800 });

  const addElement = (element: EditorElement) => {
    elements.value.push(element);
  };

  const removeElement = (id: string) => {
    elements.value = elements.value.filter(e => e.id !== id);
    wires.value = wires.value.filter(
      w => w.from.elementId !== id && w.to.elementId !== id
    );
  };

  const updateElement = (id: string, updates: Partial<EditorElement>) => {
    const element = elements.value.find(e => e.id === id);
    if (element) Object.assign(element, updates);
  };

  const addWire = (wire: EditorWire) => {
    wires.value.push(wire);
  };

  const removeWire = (id: string) => {
    wires.value = wires.value.filter(w => w.id !== id);
  };

  const selectElement = (id: string | null) => {
    selectedElement.value = id;
  };

  const clear = () => {
    elements.value = [];
    wires.value = [];
    selectedElement.value = null;
  };

  return {
    elements,
    wires,
    selectedElement,
    canvasSize,
    addElement,
    removeElement,
    updateElement,
    addWire,
    removeWire,
    selectElement,
    clear
  };
});