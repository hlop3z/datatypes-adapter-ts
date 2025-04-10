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

// Define a complex model with nested objects and arrays
const orderModel = {
  name: 'Order',
  description: 'Represents a customer order with items and shipping information',
  fields: {
    id: { 
      type: 'number',
      required: true,
      description: 'Unique identifier for the order'
    },
    customerId: { 
      type: 'number',
      required: true,
      description: 'Reference to the customer who placed the order'
    },
    orderDate: { 
      type: 'date',
      required: true,
      description: 'Date when the order was placed'
    },
    status: { 
      type: 'string',
      required: true,
      defaultValue: 'pending',
      description: 'Current status of the order',
      constraints: {
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
      }
    },
    items: { 
      type: 'array',
      description: 'List of items in the order'
    },
    shippingAddress: { 
      type: 'object',
      required: true,
      description: 'Shipping address for the order'
    },
    totalAmount: { 
      type: 'number',
      required: true,
      description: 'Total amount of the order'
    },
    notes: { 
      type: 'string',
      description: 'Additional notes for the order'
    }
  }
};

// Define a model with relationships
const blogPostModel = {
  name: 'BlogPost',
  description: 'Represents a blog post with author and comments',
  fields: {
    id: { 
      type: 'number',
      required: true,
      description: 'Unique identifier for the blog post'
    },
    title: { 
      type: 'string',
      required: true,
      description: 'Title of the blog post'
    },
    content: { 
      type: 'string',
      required: true,
      description: 'Content of the blog post'
    },
    authorId: { 
      type: 'number',
      required: true,
      description: 'Reference to the author of the blog post'
    },
    publishDate: { 
      type: 'date',
      description: 'Date when the blog post was published'
    },
    tags: { 
      type: 'array',
      description: 'Tags associated with the blog post'
    },
    isPublished: { 
      type: 'boolean',
      defaultValue: false,
      description: 'Whether the blog post is published'
    },
    viewCount: { 
      type: 'number',
      defaultValue: 0,
      description: 'Number of views for the blog post'
    }
  }
};

// Transform models to different formats
console.log('=== Order Model ===');
console.log('\nTypeScript:');
console.log(transformer.transform(orderModel, 'typescript'));
console.log('\nPython:');
console.log(transformer.transform(orderModel, 'python'));
console.log('\nPostgreSQL:');
console.log(transformer.transform(orderModel, 'postgres'));

console.log('\n\n=== Blog Post Model ===');
console.log('\nTypeScript:');
console.log(transformer.transform(blogPostModel, 'typescript'));
console.log('\nPython:');
console.log(transformer.transform(blogPostModel, 'python'));
console.log('\nPostgreSQL:');
console.log(transformer.transform(blogPostModel, 'postgres')); 