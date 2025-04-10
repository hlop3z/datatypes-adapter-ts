# Model Transformer

A modular TypeScript library that allows you to define abstract "models" (data schemas with fields and types) and transform them into code for different languages or platforms using pluggable adapters.

## Features

- Define models with fields and metadata
- Support for various field types (string, number, boolean, date, array, object)
- Pluggable adapters for different target languages/platforms
- Extensible architecture for creating custom adapters
- TypeScript support with type definitions

## Usage

### Basic Usage

```typescript
import { ModelTransformerImpl } from 'model-transformer';
import { TypeScriptAdapter } from 'model-transformer/adapters/typescript';
import { PythonAdapter } from 'model-transformer/adapters/python';
import { PostgresAdapter } from 'model-transformer/adapters/postgres';

// Create a transformer instance
const transformer = new ModelTransformerImpl();

// Register adapters
transformer.registerAdapter(new TypeScriptAdapter());
transformer.registerAdapter(new PythonAdapter());
transformer.registerAdapter(new PostgresAdapter());

// Define a model
const userModel = {
  name: 'User',
  fields: {
    id: { type: 'number' },
    name: { type: 'string' },
    email: { type: 'string' },
    age: { type: 'number' },
    isActive: { type: 'boolean' }
  }
};

// Transform to different formats
const typescriptCode = transformer.transform(userModel, 'typescript');
const pythonCode = transformer.transform(userModel, 'python');
const postgresCode = transformer.transform(userModel, 'postgres');

console.log(typescriptCode);
// Output:
// interface User {
//   id: number;
//   name: string;
//   email: string;
//   age: number;
//   isActive: boolean;
// }

console.log(pythonCode);
// Output:
// class User:
//     id: int
//     name: str
//     email: str
//     age: int
//     isActive: bool

console.log(postgresCode);
// Output:
// CREATE TABLE User (
//     id integer,
//     name varchar(255),
//     email varchar(255),
//     age integer,
//     isActive boolean
// );
```

### Creating a Custom Adapter

```typescript
import { BaseAdapter } from 'model-transformer/adapters/base';

// Create a custom adapter for Java
class JavaAdapter extends BaseAdapter {
  constructor() {
    super('java');
  }

  getTypeMapping() {
    return {
      string: 'String',
      number: 'Integer',
      boolean: 'Boolean',
      date: 'Date',
      array: 'List<Object>',
      object: 'Map<String, Object>'
    };
  }

  transform(model) {
    const fields = Object.entries(model.fields)
      .map(([name, field]) => {
        const type = this.getFieldType(field.type);
        return `    private ${type} ${name};`;
      })
      .join('\n');

    const getters = Object.entries(model.fields)
      .map(([name, field]) => {
        const type = this.getFieldType(field.type);
        return `    public ${type} get${name.charAt(0).toUpperCase() + name.slice(1)}() {\n        return ${name};\n    }`;
      })
      .join('\n\n');

    const setters = Object.entries(model.fields)
      .map(([name, field]) => {
        const type = this.getFieldType(field.type);
        return `    public void set${name.charAt(0).toUpperCase() + name.slice(1)}(${type} ${name}) {\n        this.${name} = ${name};\n    }`;
      })
      .join('\n\n');

    return `public class ${model.name} {\n${fields}\n\n${getters}\n\n${setters}\n}`;
  }
}

// Register the custom adapter
transformer.registerAdapter(new JavaAdapter());
```

## Available Adapters

- **TypeScriptAdapter**: Transforms models into TypeScript interfaces
- **PythonAdapter**: Transforms models into Python classes
- **PostgresAdapter**: Transforms models into PostgreSQL table definitions

## Field Types

The library supports the following field types:

- `string`: Text data
- `number`: Numeric data
- `boolean`: Boolean values
- `date`: Date and time values
- `array`: Lists of values
- `object`: Complex objects

## Field Metadata

Each field can have the following metadata:

- `type`: The type of the field (required)
- `required`: Whether the field is required
- `defaultValue`: Default value for the field
- `description`: Description of the field
- `constraints`: Additional constraints for the field
