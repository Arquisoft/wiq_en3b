import User from "../src/models/user-model";
import jwt from 'jsonwebtoken';

const request = require('supertest');
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('User Service', () => {
  it('should add a new user on POST /adduser', async () => {
    const newUser = {
      username: 'testuser',
      password: 'testpassword',
    };

    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(200);
    expect(response.body.data.user).toHaveProperty('username', 'testuser');
  });

  // GET /history error
  it('should get an error in /history when the user does not exist', async () => {
    const response = await request(app)
        .get('/history?user=nonexistentuser');

    expect(response.statusCode).toBe(400);
    expect(response.body.data.history).toBeUndefined();
  });

  // GET /history success
  it('should obtain the history data for the user', async () => {
    const response = await request(app)
        .get('/history?user=testuser');

    expect(response.statusCode).toBe(200);
    expect(response.body.data.history).not.toBeUndefined();
    const expectedProperties = ['passedQuestions', 'failedQuestions', 'gamesPlayed', 'timePlayed', 'points']
    expectedProperties.forEach(property => expect(response.body.data.history).toHaveProperty(property));
  });

  let testToken = '';
  // POST /history
  it('should update the history data for the user', async () => {
    const user = await User.findOne({ username:'testuser' });

    // Generates a temporary token for this and other tests
    testToken = jwt.sign({ userId: user!._id }, 'your-secret-key', {
      expiresIn: '2m',
    });

    const newHistory = {
      history: {
        passedQuestions: 10,
        failedQuestions: 10,
        gamesPlayed: 10,
        timePlayed: 10,
        points: 10,
      },
    };

    const response = await request(app)
        .post('/history')
        .send(newHistory)
        .set('Authorization', `Bearer ${testToken}`);

    expect(response.statusCode).toBe(200);

    const getResponse = await request(app)
        .get('/history?user=testuser');

    expect(getResponse.statusCode).toBe(200);
    expect(JSON.stringify(getResponse.body.data.history)).toMatch(JSON.stringify(newHistory.history));
  });

  // POST /history/increment
  it('should increment the value for the given key in the history', async () => {
    const expectedHistory = {
      history: {
        passedQuestions: 12,
        failedQuestions: 10,
        gamesPlayed: 16,
        timePlayed: 10,
        points: 11,
      },
    };

    const increment = {
      history: {
        passedQuestions: 2,
        gamesPlayed: 6,
        points: 1,
      },
    };

    const response = await request(app)
        .post('/history/increment')
        .send(increment)
        .set('Authorization', `Bearer ${testToken}`);

    expect(response.statusCode).toBe(200);

    const getResponse = await request(app)
        .get('/history?user=testuser');

    expect(getResponse.statusCode).toBe(200);
    expect(JSON.stringify(getResponse.body.data.history)).toMatch(JSON.stringify(expectedHistory.history));
  });
});
