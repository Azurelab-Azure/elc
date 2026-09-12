/**
 * PLC相关类型定义
 */

export interface LadderProgram {
  id: string;
  name: string;
  rungs: LadderRung[];
  variables: PLCVariable[];
}

export interface LadderRung {
  id: string;
  contacts: Contact[];
  coil: Coil | null;
  branch: BranchCondition;
}

export interface Contact {
  id: string;
  type: ContactType;
  variable: string;
  isNormallyOpen: boolean;
}

export type ContactType = 'input' | 'internal' | 'timer' | 'counter';

export interface Coil {
  id: string;
  type: CoilType;
  variable: string;
  parameters: CoilParameters;
}

export type CoilType = 'output' | 'internal' | 'timer' | 'counter' | 'set' | 'reset';

export interface CoilParameters {
  preset?: number;
  unit?: 'seconds' | 'milliseconds';
}

export interface BranchCondition {
  type: 'series' | 'parallel';
  contacts: Contact[];
  children?: BranchCondition[];
}

export interface PLCVariable {
  name: string;
  type: VariableType;
  address: string;
  value: boolean | number;
  comment: string;
}

export type VariableType = 'BOOL' | 'INT' | 'DINT' | 'REAL' | 'TIME';