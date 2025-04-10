import type { FieldType } from '../types.js';
import { BaseAdapter } from './base.js';

export class PythonAdapter extends BaseAdapter {
  constructor() {
    super('python');
  }

  getTypeMapping(): Record<FieldType, string> {
    return {
      string: 'str',
      number: 'int',
      boolean: 'bool',
      date: 'datetime.datetime',
      array: 'list',
      object: 'dict'
    };
  }

  transform(model: { name: string; fields: Record<string, { type: FieldType }> }): string {
    const fields = Object.entries(model.fields)
      .map(([name, field]) => {
        const type = this.getFieldType(field.type);
        return `    ${name}: ${type}`;
      })
      .join('\n');

    return `class ${model.name}:\n${fields}`;
  }
} 