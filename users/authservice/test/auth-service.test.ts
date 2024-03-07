const request = require('supertest');
import { MongoMemoryServer } from 'mongodb-memory-server';
import bcrypt from 'bcrypt';
import User from '../src/models/auth-model';
import mongoose from 'mongoose';
import app from '../src/app';

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
    expect(response.body).toHaveProperty('username', 'testuser');
  });
});
