/**
 * 仿真相关类型定义
 */

export interface SimulationState {
  isRunning: boolean;
  isPaused: boolean;
  time: number;
  speed: number;
  step: number;
}

export interface ThreePhaseState {
  voltageL1: number;
  voltageL2: number;
  voltageL3: number;
  currentL1: number;
  currentL2: number;
  currentL3: number;
  frequency: number;
  phaseAngle: number;
  isBalanced: boolean;
}

export interface PLCState {
  inputs: Record<string, boolean>;
  outputs: Record<string, boolean>;
  timers: Record<string, TimerState>;
  counters: Record<string, CounterState>;
  program: string;
  scanCycle: number;
  isRunning: boolean;
}

export interface TimerState {
  preset: number;
  current: number;
  done: boolean;
  enabled: boolean;
}

export interface CounterState {
  preset: number;
  current: number;
  done: boolean;
  reset: boolean;
}

export interface OscilloscopeState {
  channels: ChannelConfig[];
  timeBase: number;
  voltageScale: number;
  trigger: TriggerConfig;
  isRunning: boolean;
}

export interface ChannelConfig {
  id: number;
  enabled: boolean;
  color: string;
  label: string;
  offset: number;
}

export interface TriggerConfig {
  type: TriggerType;
  source: number;
  level: number;
  slope: 'rising' | 'falling';
}

export type TriggerType = 'auto' | 'normal' | 'single' | 'none';