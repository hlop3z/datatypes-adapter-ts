import type { ModelAdapter, ModelDefinition, FieldType } from '../types.js';

export abstract class BaseAdapter implements ModelAdapter {
  constructor(public readonly name: string) {}

  abstract transform(model: ModelDefinition): string;
  abstract getTypeMapping(): Record<FieldType, string>;

  protected getFieldType(fieldType: FieldType): string {
    const typeMapping = this.getTypeMapping();
    return typeMapping[fieldType] || fieldType;
  }

  protected formatFieldName(name: string): string {
    return name;
  }
} 