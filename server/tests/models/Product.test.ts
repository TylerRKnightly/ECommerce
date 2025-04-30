import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import ProductModel, { IProduct } from '../../src/models/Product';

let mongoServer: MongoMemoryServer;

describe('Product Model', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterEach(async () => {
    await ProductModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  const validProductData: Partial<IProduct> = {
    name: 'Test Product',
    description: 'A great product',
    price: 99.99,
    imageUrl: 'http://example.com/product.jpg',
    countInStock: 10,
    category: {
      name: 'Electronics',
      tags: ['gadgets', 'tech'],
    },
  };

  it('should create and save a product successfully', async () => {
    const product = new ProductModel(validProductData);
    const savedProduct = await product.save();

    expect(savedProduct._id).toBeDefined();
    expect(savedProduct.name).toBe(validProductData.name);
    expect(savedProduct.price).toBe(validProductData.price);
    expect(savedProduct.category).toHaveProperty('name', 'Electronics');
    expect(savedProduct.category).toHaveProperty('tags');
    expect(savedProduct.createdDate).toBeInstanceOf(Date);
  });

  it('should fail to create a product without required fields', async () => {
    const product = new ProductModel({});

    let error: any;
    try {
      await product.save();
    } catch (err) {
      error = err as any;
    }

    expect(error).toBeDefined();
    expect(error.name).toBe('ValidationError');
    expect(error.errors['name']).toBeDefined();
    expect(error.errors['price']).toBeDefined();
    expect(error.errors['countInStock']).toBeDefined();
    expect(error.errors['category.name']).toBeDefined();
  });

  it('should set createdDate by default if not provided', async () => {
    const { createdDate, ...productDataWithoutDate } = validProductData;
    const product = new ProductModel(productDataWithoutDate);
    const savedProduct = await product.save();

    expect(savedProduct.createdDate).toBeInstanceOf(Date);
  });

  it('should allow empty description and imageUrl', async () => {
    const minimalProduct = new ProductModel({
      name: 'Simple Product',
      price: 50,
      countInStock: 5,
      category: {
        name: 'Miscellaneous',
        tags: [],
      },
    });

    const savedProduct = await minimalProduct.save();

    expect(savedProduct.description).toBeUndefined();
    expect(savedProduct.imageUrl).toBeUndefined();
  });
});
