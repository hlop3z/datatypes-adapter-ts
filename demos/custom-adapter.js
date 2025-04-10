import { ModelTransformerImpl } from '../src/transformer.js';
import { BaseAdapter } from '../src/adapters/base.js';

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

// Create a transformer instance
const transformer = new ModelTransformerImpl();

// Register the custom adapter
transformer.registerAdapter(new JavaAdapter());

// Define an example model
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

// Transform the model to Java
console.log('=== User Model in Java ===');
console.log(transformer.transform(userModel, 'java')); 