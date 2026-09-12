import { ref } from 'vue';

export interface CatalogItem {
  id: string;
  type: 'circuit' | 'document' | 'animation' | 'image';
  category: string;
  title: string;
  description: string;
  path: string;
  thumbnail?: string;
  rating?: number;
  reviews?: number;
  usedCount?: number;
  date: string;
  tags: string[];
  author?: string;
  readTime?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  color: string;
  itemCount: number;
}

export interface CircuitItem {
  id: string;
  name: string;
  description: string;
  category: string;
  complexity: string;
  filePath: string;
  thumbnail?: string;
  simulationRules?: string;
  author?: string;
  date?: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  description: string;
  type: string;
  filePath: string;
  author?: string;
  date: string;
  readTime?: string;
}

export interface RuleConfig {
  id: string;
  name: string;
  description: string;
  parameters: Record<string, any>;
  logic: string[];
  conditions: any[];
  actions: any[];
}

interface CatalogFile {
  version: string;
  updatedAt: string;
  categories: Category[];
  circuits: any[];
  documents: any[];
  animations: any[];
  images: any[];
}

class DataLoader {
  private catalog: CatalogItem[] = [];
  private categories: Category[] = [];
  private circuits: CircuitItem[] = [];
  private documents: DocumentItem[] = [];
  private rules: Record<string, RuleConfig> = {};
  private catalogFile: CatalogFile | null = null;
  private loading = ref(false);
  private error = ref<string | null>(null);
  private initialized = false;

  async loadAll(): Promise<void> {
    if (this.initialized) return;
    this.loading.value = true;
    this.error.value = null;

    try {
      await this.loadCatalogFile();
      await this.loadCategoriesFromCatalog();
      await this.loadCircuitsFromFiles();
      await this.loadDocumentsFromFiles();
      await this.loadRulesFromFiles();
      this.initialized = true;
    } catch (err) {
      this.error.value = (err as Error).message;
    } finally {
      this.loading.value = false;
    }
  }

  private async loadCatalogFile(): Promise<void> {
    try {
      const response = await fetch('/beta/catalog.json');
      if (!response.ok) {
        this.catalogFile = null;
        return;
      }
      this.catalogFile = await response.json();
    } catch {
      this.catalogFile = null;
    }
  }

  private async loadCategoriesFromCatalog(): Promise<void> {
    if (this.catalogFile?.categories && Array.isArray(this.catalogFile.categories)) {
      this.categories = this.catalogFile.categories;
    } else {
      this.categories = [];
    }
  }

  async loadCircuits(): Promise<void> {
    await this.loadCircuitsFromFiles();
  }

  private async loadCircuitsFromFiles(): Promise<void> {
    const circuits: CircuitItem[] = [];

    const htmlModules = import.meta.glob('/beta/circuits/**/*.html', { 
      query: '?raw', 
      import: 'default' 
    });

    const paths = Object.keys(htmlModules);

    for (const path of paths) {
      const parts = path.split('/');
      const fileName = parts[parts.length - 1].replace('.html', '');
      const category = parts[parts.length - 2];

      const meta = this.findCircuitMeta(category, fileName);

      circuits.push({
        id: `${category}-${fileName}`,
        name: meta?.title || this.formatName(fileName),
        description: meta?.description || '',
        category,
        complexity: meta?.complexity || '中级',
        filePath: path,
        thumbnail: meta?.thumbnail || `/beta/images/thumbnails/thumb_${fileName}.png`,
        simulationRules: meta?.simulationRules,
        author: meta?.author,
        date: meta?.date
      });
    }

    this.circuits = circuits;
  }

  private findCircuitMeta(category: string, fileName: string): any {
    if (!this.catalogFile?.circuits) return null;
    return this.catalogFile.circuits.find(
      (c: any) => c.category === category && c.fileName === fileName
    );
  }

  async loadDocuments(): Promise<void> {
    await this.loadDocumentsFromFiles();
  }

  private async loadDocumentsFromFiles(): Promise<void> {
    const documents: DocumentItem[] = [];

    const mdModules = import.meta.glob('/beta/docs/**/*.md', { 
      query: '?raw', 
      import: 'default' 
    });

    const paths = Object.keys(mdModules);

    for (const path of paths) {
      const parts = path.split('/');
      const fileName = parts[parts.length - 1].replace('.md', '');
      const category = parts[parts.length - 2];

      const meta = this.findDocumentMeta(category, fileName);

      documents.push({
        id: `${category}-${fileName}`,
        title: meta?.title || this.formatName(fileName),
        description: meta?.description || '',
        type: meta?.type || category,
        filePath: path,
        author: meta?.author,
        date: meta?.date || '',
        readTime: meta?.readTime || ''
      });
    }

    this.documents = documents;
  }

  private findDocumentMeta(category: string, fileName: string): any {
    if (!this.catalogFile?.documents) return null;
    return this.catalogFile.documents.find(
      (d: any) => d.category === category && d.fileName === fileName
    );
  }

  private async loadRulesFromFiles(): Promise<void> {
    const ruleModules = import.meta.glob('/rules/**/*.json');

    for (const path in ruleModules) {
      try {
        const module: any = await ruleModules[path]();
        const parts = path.split('/');
        const category = parts[parts.length - 2];
        const fileName = parts[parts.length - 1].replace('.json', '');

        const data = module.default || module;

        this.rules[`${category}-${fileName}`] = {
          id: `${category}-${fileName}`,
          name: data.name || this.formatName(fileName),
          description: data.description || '',
          parameters: data.parameters || {},
          logic: data.logic || [],
          conditions: data.conditions || [],
          actions: data.actions || []
        };
      } catch {
        continue;
      }
    }
  }

  private formatName(name: string): string {
    return name
      .replace(/-/g, ' ')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  }

  getCatalog(): CatalogItem[] {
    return this.catalog;
  }

  getCategories(): Category[] {
    return this.categories;
  }

  getCircuits(): CircuitItem[] {
    return this.circuits;
  }

  getCircuitById(id: string): CircuitItem | undefined {
    return this.circuits.find(c => c.id === id);
  }

  getCircuitsByCategory(category: string): CircuitItem[] {
    return this.circuits.filter(c => c.category === category);
  }

  getDocuments(): DocumentItem[] {
    return this.documents;
  }

  getDocumentById(id: string): DocumentItem | undefined {
    return this.documents.find(d => d.id === id);
  }

  getDocumentsByType(type: string): DocumentItem[] {
    return this.documents.filter(d => d.type === type);
  }

  getRule(id: string): RuleConfig | undefined {
    return this.rules[id];
  }

  getRulesByCategory(category: string): RuleConfig[] {
    return Object.values(this.rules).filter(r => r.id.startsWith(category));
  }

  isLoading(): boolean {
    return this.loading.value;
  }

  getError(): string | null {
    return this.error.value;
  }

  hasData(): boolean {
    return this.circuits.length > 0 || this.documents.length > 0;
  }
}

export const dataLoader = new DataLoader();