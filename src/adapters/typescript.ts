import type { FieldType } from '../types.js';
import { BaseAdapter } from './base.js';

export class TypeScriptAdapter extends BaseAdapter {
  constructor() {
    super('typescript');
  }

  getTypeMapping(): Record<FieldType, string> {
    return {
      string: 'string',
      number: 'number',
      boolean: 'boolean',
      date: 'Date',
      array: 'any[]',
      object: 'Record<string, any>'
    };
  }

  transform(model: { name: string; fields: Record<string, { type: FieldType }> }): string {
    const fields = Object.entries(model.fields)
      .map(([name, field]) => {
        const type = this.getFieldType(field.type);
        return `  ${name}: ${type};`;
      })
      .join('\n');

    return `interface ${model.name} {\n${fields}\n}`;
  }
} 