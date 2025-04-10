import type { ModelDefinition, ModelAdapter, ModelTransformer } from './types.js';

export class ModelTransformerImpl implements ModelTransformer {
  private adapters: Map<string, ModelAdapter> = new Map();

  registerAdapter(adapter: ModelAdapter): void {
    this.adapters.set(adapter.name, adapter);
  }

  transform(model: ModelDefinition, adapterName: string): string {
    const adapter = this.adapters.get(adapterName);
    if (!adapter) {
      throw new Error(`Adapter '${adapterName}' not found`);
    }
    return adapter.transform(model);
  }
} 