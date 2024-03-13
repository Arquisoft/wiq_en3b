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

  it('should get an error for duplicated user on POST /adduser', async () => {
    const newUser = {
      username: 'testuser',
      password: 'testpassword2',
    };

    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(400);
  });

  // GET /history error (no user)
  it('should get an error in GET /history when not passing a user', async () => {
    const response = await request(app)
        .get('/history');

    expect(response.statusCode).toBe(400);
    expect(response.body.data.history).toBeUndefined();
  });

  // GET /history error (non-existent user)
  it('should get an error in GET /history when user does not exist', async () => {
    const response = await request(app)
        .get('/history?user=nonexistentuser');

    expect(response.statusCode).toBe(400);
    expect(response.body.data.history).toBeUndefined();
  });

  // GET /history success
  it('should obtain the history data for the user with GET /history', async () => {
    const response = await request(app)
        .get('/history?user=testuser');

    expect(response.statusCode).toBe(200);
    expect(response.body.data.history).not.toBeUndefined();
    const expectedProperties = ['passedQuestions', 'failedQuestions', 'gamesPlayed', 'timePlayed', 'points']
    expectedProperties.forEach(property => expect(response.body.data.history).toHaveProperty(property));
  });

  // POST /history (no user)
  it('should get an error in POST /history when not logged in', async () => {
    const newHistory = {
      history: {
        passedQuestions: 0,
        failedQuestions: 0,
        gamesPlayed: 0,
        timePlayed: 0,
        points: 0,
      },
    };

    const response = await request(app)
        .post('/history')
        .send(newHistory);

    expect(response.statusCode).toBe(400);
    expect(response.body.data.history).toBeUndefined();
  });

  let testToken = '';
  // POST /history
  it('should update the history data for the user with POST /history', async () => {
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

  // POST /history (no history)
  it('should get an error in POST /history when not sending a new history', async () => {
    const response = await request(app)
        .post('/history')
        .set('Authorization', `Bearer ${testToken}`);

    expect(response.statusCode).toBe(400);
    expect(response.body.data.history).toBeUndefined();
  });

  // POST /history/increment (no user)
  it('should get an error in POST /history/increment when not logged in', async () => {
    const increment = {
      history: {
        passedQuestions: 1,
      },
    };

    const response = await request(app)
        .post('/history/increment')
        .send(increment);

    expect(response.statusCode).toBe(400);
    expect(response.body.data.history).toBeUndefined();
  });

  // POST /history (no increment)
  it('should get an error in POST /history/increment when not sending a json with increments', async () => {
    const response = await request(app)
        .post('/history/increment')
        .set('Authorization', `Bearer ${testToken}`);

    expect(response.statusCode).toBe(400);
    expect(response.body.data.history).toBeUndefined();
  });

  // POST /history/increment success
  it('should increment the values of history with POST /history/increment', async () => {
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
