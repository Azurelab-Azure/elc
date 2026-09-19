import { ref } from 'vue';

export interface TeachingItem {
  id: string;
  fileName: string;
  title: string;
  description: string;
  format: 'md' | 'html';
  level: string;
  author: string;
  date: string;
  readTime: string;
  thumbnail: string;
  tags: string[];
  filePath: string;
}

export interface SimulationItem {
  id: string;
  fileName: string;
  title: string;
  description: string;
  complexity: string;
  author: string;
  date: string;
  thumbnail: string;
  tags: string[];
  filePath: string;
}

export interface CircuitItem {
  id: string;
  fileName: string;
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
  thumbnail: string;
  tags: string[];
  filePath: string;
}

interface CatalogFile {
  version: string;
  updatedAt: string;
  teaching: any[];
  simulation: any[];
  circuits: any[];
}

class DataLoader {
  private catalog: CatalogFile | null = null;
  private teaching: TeachingItem[] = [];
  private simulation: SimulationItem[] = [];
  private circuits: CircuitItem[] = [];
  private loading = ref(false);
  private error = ref<string | null>(null);
  private initialized = false;

  async loadAll(): Promise<void> {
    if (this.initialized) return;
    this.loading.value = true;
    this.error.value = null;

    try {
      await this.loadCatalog();
      this.buildTeaching();
      this.buildSimulation();
      this.buildCircuits();
      this.initialized = true;
    } catch (err) {
      this.error.value = (err as Error).message;
    } finally {
      this.loading.value = false;
    }
  }

  private async loadCatalog(): Promise<void> {
    try {
      const response = await fetch('/beta/catalog.json');
      if (!response.ok) throw new Error('catalog.json not found');
      this.catalog = await response.json();
    } catch {
      this.catalog = null;
    }
  }

  private buildTeaching(): void {
  const mdModules = import.meta.glob('/beta/teaching/**/*.md', {
    query: '?raw',
    import: 'default'
  });

  const htmlModules = import.meta.glob('/beta/teaching/**/*.html', {
    query: '?raw',
    import: 'default'
  });

  const meta = this.catalog?.teaching || [];
  const items: TeachingItem[] = [];

  const buildItem = (path: string, format: 'md' | 'html') => {
    const fileName = path.split('/').pop()?.replace(/\.(md|html)$/, '') || '';
    const m = meta.find((x: any) => x.fileName === fileName) || {};

    return {
      id: `teaching-${fileName}`,
      fileName,
      title: m.title || fileName.replace(/-/g, ' '),
      description: m.description || '',
      format,
      level: m.level || '入门',
      author: m.author || '匿名',
      date: m.date || '',
      readTime: m.readTime || '',
      thumbnail: m.thumbnail || `/beta/images/thumb-${fileName}.png`,
      tags: m.tags || [],
      filePath: path
    };
  };

  Object.keys(mdModules).forEach(path => {
    items.push(buildItem(path, 'md'));
  });

  Object.keys(htmlModules).forEach(path => {
    items.push(buildItem(path, 'html'));
  });

  this.teaching = items;
}

  private buildSimulation(): void {
    const htmlModules = import.meta.glob('/beta/simulation/**/*.html', {
      query: '?raw',
      import: 'default'
    });

    const files = Object.keys(htmlModules);
    const meta = this.catalog?.simulation || [];

    this.simulation = files.map(path => {
      const fileName = path.split('/').pop()?.replace('.html', '') || '';
      const m = meta.find((x: any) => x.fileName === fileName) || {};

      return {
        id: `simulation-${fileName}`,
        fileName,
        title: m.title || fileName.replace(/-/g, ' '),
        description: m.description || '',
        complexity: m.complexity || '中级',
        author: m.author || '匿名',
        date: m.date || '',
        thumbnail: m.thumbnail || `/beta/images/thumb-${fileName}.png`,
        tags: m.tags || [],
        filePath: path
      };
    });
  }

  private buildCircuits(): void {
    const svgModules = import.meta.glob('/beta/circuits/**/*.{svg,png,jpg,jpeg,webp}', {
      as: 'url'
    });

    const files = Object.keys(svgModules);
    const meta = this.catalog?.circuits || [];

    this.circuits = files.map(path => {
      const fileName = path.split('/').pop()?.replace(/\.(svg|png|jpg|jpeg|webp)$/, '') || '';
      const m = meta.find((x: any) => x.fileName === fileName) || {};

      return {
        id: `circuit-${fileName}`,
        fileName,
        title: m.title || fileName.replace(/-/g, ' '),
        description: m.description || '',
        category: m.category || '基础',
        author: m.author || '匿名',
        date: m.date || '',
        thumbnail: m.thumbnail || path,
        tags: m.tags || [],
        filePath: path
      };
    });
  }

  getTeaching(): TeachingItem[] {
    return this.teaching;
  }

  getSimulation(): SimulationItem[] {
    return this.simulation;
  }

  getCircuits(): CircuitItem[] {
    return this.circuits;
  }

  getTeachingById(id: string): TeachingItem | undefined {
    return this.teaching.find(t => t.id === id);
  }

  getSimulationById(id: string): SimulationItem | undefined {
    return this.simulation.find(s => s.id === id);
  }

  getCircuitById(id: string): CircuitItem | undefined {
    return this.circuits.find(c => c.id === id);
  }

  isLoading(): boolean {
    return this.loading.value;
  }

  getError(): string | null {
    return this.error.value;
  }

  hasData(): boolean {
    return this.teaching.length > 0 || this.simulation.length > 0 || this.circuits.length > 0;
  }
}

export const dataLoader = new DataLoader();