import type { FieldType } from '../types.js';
import { BaseAdapter } from './base.js';

export class PostgresAdapter extends BaseAdapter {
  constructor() {
    super('postgres');
  }

  getTypeMapping(): Record<FieldType, string> {
    return {
      string: 'varchar(255)',
      number: 'integer',
      boolean: 'boolean',
      date: 'timestamp',
      array: 'jsonb',
      object: 'jsonb'
    };
  }

  transform(model: { name: string; fields: Record<string, { type: FieldType }> }): string {
    const fields = Object.entries(model.fields)
      .map(([name, field]) => {
        const type = this.getFieldType(field.type);
        return `    ${name} ${type}`;
      })
      .join(',\n');

    return `CREATE TABLE ${model.name} (\n${fields}\n);`;
  }
} 