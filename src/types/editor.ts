/**
 * 在线绘制编辑器类型定义
 */

export interface EditorState {
  elements: EditorElement[];
  selectedIds: string[];
  gridEnabled: boolean;
  snapToGrid: boolean;
  gridSize: number;
  zoom: number;
  pan: { x: number; y: number };
  tool: EditorTool;
  clipboard: EditorElement[];
}

export interface EditorElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  properties: Record<string, unknown>;
  pins: Pin[];
  connections: Connection[];
}

export type EditorTool = 
  | 'select'
  | 'move'
  | 'wire'
  | 'element'
  | 'text'
  | 'delete';

export interface ExportOptions {
  format: ExportFormat;
  includeGrid: boolean;
  includeLabels: boolean;
  scale: number;
}

export type ExportFormat = 'html' | 'png' | 'json' | 'svg';

export interface DragState {
  isDragging: boolean;
  startX: number;
  startY: number;
  elementIds: string[];
  offsetX: number;
  offsetY: number;
}