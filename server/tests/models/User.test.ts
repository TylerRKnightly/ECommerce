import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import UserModel, { IUser } from '../../src/models/User';
import bcrypt from 'bcryptjs';
import exp from 'constants';

let mongoServer: MongoMemoryServer;

describe('User Model', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterEach(async () => {
    await UserModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  const validUserData: Partial<IUser> = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user',
  };

  it('should create and save a user successfully', async () => {
    const user = new UserModel(validUserData);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.firstName).toBe(validUserData.firstName);
    expect(savedUser.lastName).toBe(validUserData.lastName);
    expect(savedUser.email).toBe(validUserData.email!.toLowerCase());
    expect(savedUser.role).toBe('user');
    expect(savedUser.createdAt).toBeInstanceOf(Date);
  });

  it('should hash the password before saving', async () => {
    const user = new UserModel(validUserData);
    const savedUser = await user.save();

    expect(savedUser.password).not.toBe(validUserData.password);
    const isMatch = await bcrypt.compare(validUserData.password!, savedUser.password);
    expect(isMatch).toBe(true);
  });

  it('should match password correctly using matchPassword method', async () => {
    const user = new UserModel(validUserData);
    const savedUser = await user.save();

    const isMatch = await savedUser.matchPassword('password123');
    expect(isMatch).toBe(true);

    const isNotMatch = await savedUser.matchPassword('wrongpassword');
    expect(isNotMatch).toBe(false);
  });

  it('should enforce unique email constraint', async () => {
    const user1 = new UserModel(validUserData);
    const user2 = new UserModel({ ...validUserData, name: 'Jane Doe' });

    await user1.save();

    let error: any;
    try {
      await user2.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.name).toBe('MongoServerError');
    expect(error.code).toBe(11000);
  });

  it('should fail to create a user without required fields', async () => {
    const user = new UserModel({});

    let error: any;
    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.firstName).toBe('ValidationError');
    expect(error.lastName).toBe('ValidationError');
    expect(error.errors['name']).toBeDefined();
    expect(error.errors['email']).toBeDefined();
    expect(error.errors['password']).toBeDefined();
  });

  it('should default role to "user" if not specified', async () => {
    const { role, ...userWithoutRole } = validUserData;
    const user = new UserModel(userWithoutRole);
    const savedUser = await user.save();

    expect(savedUser.role).toBe('user');
  });
});
