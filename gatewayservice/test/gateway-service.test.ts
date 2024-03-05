const request = require('supertest');
import axios from 'axios';
import app from '../src/app';

jest.mock('axios');

describe('Gateway Service', () => {
  // Mock responses from external services
  (axios.post as jest.Mock).mockImplementation((url, _) => {
    if (url.endsWith('/login')) {
      return Promise.resolve({ data: { token: 'mockedToken' } });
    } else if (url.endsWith('/adduser')) {
      return Promise.resolve({ data: { userId: 'mockedUserId' } });
    } else if (url.endsWith('/history')) {
      return Promise.resolve({ data: { gamesPlayed: 10 } });
    }

    return;
  });

  (axios.get as jest.Mock).mockImplementation((url, _) => {
    if (url.endsWith('/questions')) {
      return Promise.resolve({ data: { size: 10 } });
    } else if (url.endsWith('/health')) {
      return Promise.resolve();
    }

    return;
  });

  // Test /login endpoint
  it('should forward login request to auth service', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBe('mockedToken');
  });

  // Test /adduser endpoint
  it('should forward add user request to user service', async () => {
    const response = await request(app)
      .post('/adduser')
      .send({ username: 'newuser', password: 'newpassword' });

    expect(response.statusCode).toBe(200);
    expect(response.body.userId).toBe('mockedUserId');
  });

  // Test /history endpoint
  it('should forward history request to auth service', async () => {
    const response = await request(app)
      .post('/history')
      .send({ username: 'testuser', gamesPlayed: 10 });

    expect(response.statusCode).toBe(200);
    expect(response.body.gamesPlayed).toBe(10);
  });

  // Test /questions endpoint
  it('should forward questions request to question service', async () => {
    const response = await request(app)
      .get('/questions')
      .query({ size: 10 })
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.size).toBe(10);
  });

  // Test /health endpoint
  it('should perform the health request', async () => {
    const response = await request(app).get('/health').send();

    expect(response.statusCode).toBe(200);
  });
});
