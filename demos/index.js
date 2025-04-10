import { ModelTransformerImpl } from '../src/transformer.js';
import { TypeScriptAdapter } from '../src/adapters/typescript.js';
import { PythonAdapter } from '../src/adapters/python.js';
import { PostgresAdapter } from '../src/adapters/postgres.js';

// Create a transformer instance
const transformer = new ModelTransformerImpl();

// Register adapters
transformer.registerAdapter(new TypeScriptAdapter());
transformer.registerAdapter(new PythonAdapter());
transformer.registerAdapter(new PostgresAdapter());

// Define some example models
const userModel = {
  name: 'User',
  fields: {
    id: { type: 'number' },
    name: { type: 'string' },
    email: { type: 'string' },
    age: { type: 'number' },
    isActive: { type: 'boolean' },
    createdAt: { type: 'date' }
  }
};

const productModel = {
  name: 'Product',
  fields: {
    id: { type: 'number' },
    name: { type: 'string' },
    price: { type: 'number' },
    description: { type: 'string' },
    inStock: { type: 'boolean' },
    tags: { type: 'array' },
    metadata: { type: 'object' }
  }
};

// Transform models to different formats
console.log('=== User Model ===');
console.log('\nTypeScript:');
console.log(transformer.transform(userModel, 'typescript'));
console.log('\nPython:');
console.log(transformer.transform(userModel, 'python'));
console.log('\nPostgreSQL:');
console.log(transformer.transform(userModel, 'postgres'));

console.log('\n\n=== Product Model ===');
console.log('\nTypeScript:');
console.log(transformer.transform(productModel, 'typescript'));
console.log('\nPython:');
console.log(transformer.transform(productModel, 'python'));
console.log('\nPostgreSQL:');
console.log(transformer.transform(productModel, 'postgres')); 