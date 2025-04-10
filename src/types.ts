export type FieldType = 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object';

export interface FieldMetadata {
  type: FieldType;
  required?: boolean;
  defaultValue?: any;
  description?: string;
  constraints?: Record<string, any>;
}

export interface ModelDefinition {
  name: string;
  fields: Record<string, FieldMetadata>;
  description?: string;
}

export interface ModelAdapter {
  name: string;
  transform(model: ModelDefinition): string;
  getTypeMapping(): Record<FieldType, string>;
}

export interface ModelTransformer {
  registerAdapter(adapter: ModelAdapter): void;
  transform(model: ModelDefinition, adapterName: string): string;
} 