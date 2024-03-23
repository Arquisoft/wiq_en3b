const request = require('supertest');
import { MongoMemoryServer } from 'mongodb-memory-server';
import bcrypt from 'bcrypt';
import User from '../src/models/auth-model';
import mongoose from 'mongoose';
import app from '../src/app';
import { Request } from 'express';
import {validateNotEmpty, validateRequiredLength} from "../../utils/src/field-validations";

let mongoServer: MongoMemoryServer;

//test user
const user = {
  username: 'testuser',
  password: 'testpassword',
};

async function addUser(user: { username: string; password: string }) {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  const newUser = new User({
    username: user.username,
    password: hashedPassword,
  });

  await newUser.save();
}

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
  await mongoose.connect(mongoUri);

  await addUser(user);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('Auth Service', () => {
  it('Should perform a login operation /login', async () => {
    const response = await request(app).post('/login').send(user);
    expect(response.status).toBe(200);
    expect(response.body.data.user).toHaveProperty('username', 'testuser');
  });
  it('Should fail the login operation /login when invalid credentials are used', async () => {
    const invalidUser = {
      username: 'testuser',
      password: 'invalidpassword',
    };
    const response = await request(app).post('/login').send(invalidUser);
    expect(response.status).toBe(401);
  });
  it('Should fail if no user and password is send in the body', async () => {
    const invalidBody = {
    };
    const response = await request(app).post('/login').send(invalidBody);
    expect(response.status).toBe(400);
  });

  // ======================== Tests for utils ========================
  // Note: this is duplicated code from the userservice, field-validations.ts
  // should probably be placed outside and imported by both services, as well
  // as the userSchema.

  // Empty field validation
  it('should get an error when passing an empty parameter', async () => {
    const mockRequest = {
      body: {}
    } as Request;
    mockRequest.body['history'] = '';

    try {
      validateNotEmpty(mockRequest, ['history']);
      fail('Should get an error in the previous call');
    } catch (error) {
    }
    // Should also get an error when the field does not exist
    try {
      validateNotEmpty(mockRequest, ['nonexistent']);
      fail('Should get an error in the previous call');
    } catch (error) {
    }
  });

  // Empty field validation
  it('should get an error when passing a parameter without the expected length', async () => {
    const mockRequest = {
      body: {}
    } as Request;
    mockRequest.body['test'] = '123456789';

    try {
      validateRequiredLength(mockRequest, ['test'], 10);
      fail('Should get an error in the previous call');
    } catch (error) {
    }
    // Should also get an error when the field does not exist
    try {
      validateRequiredLength(mockRequest, ['nonexistent'], 10);
      fail('Should get an error in the previous call');
    } catch (error) {
    }
  });
  // =================================================================
});
