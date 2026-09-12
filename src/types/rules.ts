/**
 * 规则引擎类型定义
 */

export interface Rule {
  id: string;
  name: string;
  description: string;
  category: RuleCategory;
  conditions: RuleCondition[];
  actions: RuleAction[];
  priority: number;
  enabled: boolean;
}

export type RuleCategory = 'three-phase' | 'plc' | 'animation' | 'protection';

export interface RuleCondition {
  type: ConditionType;
  property: string;
  operator: Operator;
  value: unknown;
  metadata?: Record<string, unknown>;
}

export type ConditionType = 
  | 'voltage'
  | 'current'
  | 'frequency'
  | 'phase'
  | 'temperature'
  | 'switch'
  | 'time'
  | 'logic';

export type Operator = 
  | 'eq'
  | 'ne'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'between'
  | 'contains'
  | 'matches';

export interface RuleAction {
  type: ActionType;
  target: string;
  value?: unknown;
  metadata?: Record<string, unknown>;
}

export type ActionType =
  | 'set-voltage'
  | 'set-current'
  | 'set-frequency'
  | 'set-phase'
  | 'toggle-switch'
  | 'start-motor'
  | 'stop-motor'
  | 'trigger-alarm'
  | 'send-event'
  | 'animate';

export interface ThreePhaseRuleConfig {
  phaseSequence: PhaseSequence;
  voltageThreshold: VoltageThreshold;
  protection: ProtectionConfig;
}

export type PhaseSequence = 'ABC' | 'ACB' | 'balanced' | 'unbalanced';

export interface VoltageThreshold {
  overVoltage: number;
  underVoltage: number;
  overFrequency: number;
  underFrequency: number;
}

export interface ProtectionConfig {
  overCurrent: boolean;
  shortCircuit: boolean;
  phaseLoss: boolean;
  groundFault: boolean;
}