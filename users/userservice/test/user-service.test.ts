import User from "../src/models/user-model";
import jwt from 'jsonwebtoken';

const request = require('supertest');
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app';
import {validateHistoryBody} from "../src/utils/history-body-validation";
import { Request } from 'express';
import {validateNotEmpty, validateRequiredLength} from "../../utils/src/field-validations";
import {verifyJWT} from "../src/utils/async-verification";

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

  // GET /history/leaderboard with size param
  it('should obtain n users with the highest scores', async () => {
    const newUserData = {
      username: 'highestscoreuser',
      password: 'testpassword',
    };
    // Add a new user to test leaderboard
    await request(app).post('/adduser').send(newUserData);

    // The new user will have 100000 points
    const increment = {
      history: {
        points: 100000,
      },
    };
    const newUser = await User.findOne({ username:'highestscoreuser' });
    // Generates a temporary token for this test
    const testToken2 = jwt.sign({ userId: newUser!._id }, 'your-secret-key', {
      expiresIn: '2m',
    });

    await request(app)
        .post('/history/increment')
        .send(increment)
        .set('Authorization', `Bearer ${testToken2}`);

    // The old user will have 99999 points
    const newHistory = {
      history: {
        points: 99999,
      },
    };
    await request(app)
        .post('/history')
        .send(newHistory)
        .set('Authorization', `Bearer ${testToken}`);

    const response = await request(app)
        .get('/history/leaderboard?size=2');

    expect(response.statusCode).toBe(200);
    expect(response.body.data.leaderboard.length).toBe(2);
    expect(response.body.data.leaderboard[0].username).toEqual('highestscoreuser');
    expect(response.body.data.leaderboard[0].history.points).toBe(100000);
    expect(response.body.data.leaderboard[1].username).toEqual('testuser');
    expect(response.body.data.leaderboard[1].history.points).toBe(99999);
  });

  // GET /history/leaderboard without param
  it('should obtain users with the highest scores', async () => {
    // If a request is made without the parameter it will return an amount of users
    // specified by a constant in the controller (DEFAULT_LEADERBOARD_SIZE)
    const response = await request(app)
        .get('/history/leaderboard');

    expect(response.statusCode).toBe(200);
    expect(response.body.data.leaderboard).not.toBeUndefined();
  });

  // GET /history/leaderboard negative param
  it('should obtain users with the highest scores', async () => {
    // If a request is made with a negative size, it will throw an exception
    const response = await request(app)
        .get('/history/leaderboard?size=-1');

    expect(response.statusCode).toBe(400);
    expect(response.body.data.leaderboard).toBeUndefined();
  });

  // Body validation util, not part of the user history
  it('should get an error when including a parameter that is not in the model', async () => {
    const mockRequest = {
      body: {
        history: {
          nonexistent: 1
        }
      }
    } as Request;
    const user = await User.find({ username:'testuser' });

    try {
      validateHistoryBody(mockRequest, user[0]);
      fail('Should get an error in the previous call');
    } catch (error) {
    }
  });

  // Body validation util, non-numeric
  it('should get an error when using non-numerical values', async () => {
    const mockRequest = {
      body: {
        history: {
          gamesPlayed: 'test'
        }
      }
    } as Request;
    const user = await User.find({ username:'testuser' });

    try {
      validateHistoryBody(mockRequest, user[0]);
      fail('Should get an error in the previous call');
    } catch (error) {
    }
  });

  // Body validation util, negative
  it('should get an error when using negative values', async () => {
    const mockRequest = {
      body: {
        history: {
          gamesPlayed: -1
        }
      }
    } as Request;
    const user = await User.find({ username:'testuser' });

    try {
      validateHistoryBody(mockRequest, user[0]);
      fail('Should get an error in the previous call');
    } catch (error) {
    }
  });

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

  // Token validator
  it('should get an error when invoking the function with an invalid token', async () => {
    try {
      await verifyJWT('invalidtoken');
      fail('Should get an error in the previous call');
    } catch (error) {
    }
  });
});
