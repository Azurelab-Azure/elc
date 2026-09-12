/**
 * 数据目录类型定义
 */

export interface Catalog {
  version: string;
  lastUpdated: string;
  circuits: CatalogCircuit[];
  docs: CatalogDoc[];
}

export interface CatalogCircuit {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  file: string;
  thumbnail: string;
  schematic?: string;
  author: string;
  dateAdded: string;
  downloads: number;
  rating: number;
}

export interface CatalogDoc {
  id: string;
  title: string;
  description: string;
  category: string;
  file: string;
  author: string;
  dateAdded: string;
  views: number;
}

export interface FilterOptions {
  category?: string;
  tags?: string[];
  search?: string;
  sortBy?: 'date' | 'rating' | 'downloads' | 'views';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationOptions {
  page: number;
  pageSize: number;
  total?: number;
}