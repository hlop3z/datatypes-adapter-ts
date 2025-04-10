export * from './types.js';
export * from './transformer.js';
export * from './adapters/base.js';
export * from './adapters/typescript.js';
export * from './adapters/python.js';
export * from './adapters/postgres.js';

// Example usage:
import { ModelTransformerImpl } from './transformer.js';
import { TypeScriptAdapter } from './adapters/typescript.js';
import { PythonAdapter } from './adapters/python.js';
import { PostgresAdapter } from './adapters/postgres.js';
import type { ModelDefinition } from './types.js';

const transformer = new ModelTransformerImpl();

// Register adapters
transformer.registerAdapter(new TypeScriptAdapter());
transformer.registerAdapter(new PythonAdapter());
transformer.registerAdapter(new PostgresAdapter());

// Example model
const userModel: ModelDefinition = {
  name: 'User',
  fields: {
    name: { type: 'string' },
    age: { type: 'number' },
    isActive: { type: 'boolean' }
  }
};

// Transform to different formats
console.log('TypeScript:');
console.log(transformer.transform(userModel, 'typescript'));
console.log('\nPython:');
console.log(transformer.transform(userModel, 'python'));
console.log('\nPostgreSQL:');
console.log(transformer.transform(userModel, 'postgres')); 