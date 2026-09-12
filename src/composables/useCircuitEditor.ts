import { ref } from 'vue';

export interface EditorElement {
  id: string;
  type: string;
  name: string;
  icon: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  properties: Record<string, any>;
}

export interface EditorWire {
  id: string;
  from: { elementId: string; pinIndex: number };
  to: { elementId: string; pinIndex: number };
  points: Array<{ x: number; y: number }>;
}

export function useCircuitEditor() {
  const elements = ref<EditorElement[]>([]);
  const wires = ref<EditorWire[]>([]);
  const selectedId = ref<string | null>(null);
  const canvasSize = ref({ width: 1200, height: 800 });
  const zoom = ref(1);
  const panOffset = ref({ x: 0, y: 0 });

  const addElement = (element: Omit<EditorElement, 'id'>) => {
    const id = `el-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    elements.value.push({ ...element, id });
    return id;
  };

  const removeElement = (id: string) => {
    elements.value = elements.value.filter(e => e.id !== id);
    wires.value = wires.value.filter(
      w => w.from.elementId !== id && w.to.elementId !== id
    );
    if (selectedId.value === id) selectedId.value = null;
  };

  const updateElement = (id: string, updates: Partial<EditorElement>) => {
    const el = elements.value.find(e => e.id === id);
    if (el) Object.assign(el, updates);
  };

  const selectElement = (id: string | null) => {
    selectedId.value = id;
  };

  const addWire = (wire: Omit<EditorWire, 'id'>) => {
    const id = `wire-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    wires.value.push({ ...wire, id });
    return id;
  };

  const removeWire = (id: string) => {
    wires.value = wires.value.filter(w => w.id !== id);
  };

  const clear = () => {
    elements.value = [];
    wires.value = [];
    selectedId.value = null;
  };

  const setZoom = (value: number) => {
    zoom.value = Math.max(0.1, Math.min(3, value));
  };

  return {
    elements,
    wires,
    selectedId,
    canvasSize,
    zoom,
    panOffset,
    addElement,
    removeElement,
    updateElement,
    selectElement,
    addWire,
    removeWire,
    clear,
    setZoom
  };
}