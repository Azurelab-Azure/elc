/**
 * 电路相关类型定义
 */

export interface Circuit {
  id: string;
  title: string;
  description: string;
  category: CircuitCategory;
  tags: string[];
  file: string;
  thumbnail: string;
  schematic?: string;
  author: string;
  dateAdded: string;
  downloads: number;
  rating: number;
  status: CircuitStatus;
}

export type CircuitCategory = 'three-phase' | 'plc' | 'basic' | 'advanced';

export type CircuitStatus = 'draft' | 'pending' | 'approved' | 'rejected';

export interface CircuitElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  rotation: number;
  properties: ElementProperties;
  connections: Connection[];
}

export type ElementType =
  | 'resistor'
  | 'capacitor'
  | 'inductor'
  | 'switch'
  | 'power-source'
  | 'ground'
  | 'motor'
  | 'plc'
  | 'contactor'
  | 'lamp'
  | 'diode'
  | 'transistor'
  | 'op-amp'
  | 'transformer'
  | 'fuse'
  | 'relay';

export interface ElementProperties {
  label?: string;
  value?: number;
  unit?: string;
  color?: string;
  [key: string]: unknown;
}

export interface Connection {
  from: string;
  fromPin: string;
  to: string;
  toPin: string;
  type: ConnectionType;
}

export type ConnectionType = 'wire' | 'bus' | 'control';

export interface SimulationResult {
  voltages: Record<string, number>;
  currents: Record<string, number>;
  power: number;
  timestamp: number;
}

export interface Pin {
  id: string;
  label: string;
  x: number;
  y: number;
  type: PinType;
}

export type PinType = 'input' | 'output' | 'power' | 'ground' | 'control';