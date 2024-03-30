const request = require('supertest');
import axios, {AxiosError, AxiosHeaders, AxiosResponse} from 'axios';
import app from '../src/app';
import { Response } from 'express';

jest.mock('axios');

const getMocks = (url: string) => {
  if (url.endsWith('/questions')) {
    return Promise.resolve({ data: { size: 10 } });
  } else if (url.endsWith('/history')) {
    return Promise.resolve({ data: { gamesPlayed: 10 } });
  } else if (url.endsWith('/history/leaderboard')) {
    return Promise.resolve({ data: { leaderboard:  {} } });
  } else if (url.endsWith('/health')) {
    return Promise.resolve();
  } else if (url.endsWith('/profile')) {
    return Promise.resolve({data: { bio: 'Test' }});
  }

  return;
};

const postMocks = (url: string) => {
  if (url.endsWith('/login')) {
    return Promise.resolve({ data: { token: 'mockedToken' } });
  } else if (url.endsWith('/adduser')) {
    return Promise.resolve({ data: { userId: 'mockedUserId' } });
  } else if (url.endsWith('/history')) {
    return Promise.resolve({ data: { gamesPlayed: 10 } });
  } else if (url.endsWith('/history/increment')) {
    return Promise.resolve({ data: { gamesPlayed: 20 } });
  } else if (url.endsWith('/profile')) {
    return Promise.resolve({data: { bio: 'Test' }});
  }

  return;
};

describe('Gateway Service', () => {
  (axios.post as jest.Mock).mockImplementation(postMocks);
  (axios.get as jest.Mock).mockImplementation(getMocks);

  // Test /login endpoint
  it('should forward login request to auth service', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBe('mockedToken');
  });

  // Test /login endpoint down
  it('should get an error when auth service is down', async () => {
    const response = await testWithoutServices(() => {
      return request(app)
          .post('/login')
          .send({ username: 'testuser', password: 'testpassword' })
    });

    expect(response.statusCode).toBe(500);
  });

  // Test /adduser endpoint
  it('should forward add user request to user service', async () => {
    const response = await request(app)
      .post('/adduser')
      .send({ username: 'newuser', password: 'newpassword' });

    expect(response.statusCode).toBe(200);
    expect(response.body.userId).toBe('mockedUserId');
  });

  // Test /adduser endpoint down
  it('should get an error when user service is down', async () => {
    const response = await testWithoutServices(() => {
      return request(app)
          .post('/adduser')
          .send({ username: 'newuser', password: 'newpassword' })
    });

    expect(response.statusCode).toBe(500);
  });

  // Test POST /history endpoint
  it('should forward history request to user service', async () => {
    const response = await request(app)
      .post('/history')
      .send({ username: 'testuser', gamesPlayed: 10 });

    expect(response.statusCode).toBe(200);
    expect(response.body.gamesPlayed).toBe(10);
  });

  // Test POST /history endpoint down
  it('should get an error when user service is down', async () => {
    const response = await testWithoutServices(() => {
      return request(app)
          .post('/history')
          .send({ username: 'testuser', gamesPlayed: 10 })
    });

    expect(response.statusCode).toBe(500);
  });

  // Test POST /history/increment endpoint
  it('should forward history request to user service', async () => {
    const response = await request(app)
        .post('/history/increment')
        .send({ username: 'testuser', gamesPlayed: 10 });

    expect(response.statusCode).toBe(200);
    expect(response.body.gamesPlayed).toBe(20);
  });

  // Test POST /history/increment endpoint down
  it('should get an error when user service is down', async () => {
    const response = await testWithoutServices(() => {
      return request(app)
          .post('/history/increment')
          .send({ username: 'testuser', gamesPlayed: 10 })
    });

    expect(response.statusCode).toBe(500);
  });

  // Test GET /history endpoint
  it('should forward history request to user service', async () => {
    const response = await request(app)
      .get('/history')
      .query({ user: 'newuser' })
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.gamesPlayed).toBe(10);
  });

  // Test GET /history endpoint down
  it('should get an error when user service is down', async () => {
    const response = await testWithoutServices(() => {
      return request(app)
          .get('/history')
          .query({ user: 'newuser' })
          .send();
    });

    expect(response.statusCode).toBe(500);
  });

  // Test GET /history/leaderboard endpoint
  it('should forward history request to user service', async () => {
    const response = await request(app)
        .get('/history/leaderboard')
        .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.leaderboard).toBeDefined();
  });

  // Test GET /history/leaderboard endpoint down
  it('should get an error when user service is down', async () => {
    const response = await testWithoutServices(() => {
      return request(app)
          .get('/history/leaderboard')
          .send();
    });

    expect(response.statusCode).toBe(500);
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

  // Test /questions endpoint down
  it('should get an error when user service is down', async () => {
    const response = await testWithoutServices(() => {
      return request(app)
          .get('/questions')
          .query({ size: 10 })
          .send();
    });

    expect(response.statusCode).toBe(500);
  });

  // Test /health endpoint
  it('should perform the health request', async () => {
    const response = await request(app).get('/health').send();

    expect(response.statusCode).toBe(200);
  });

  // Middleware not found
  it('should get a 404 error', async () => {
    const response = await request(app).get('/nonexistentendpoint').send();

    expect(response.statusCode).toBe(404);
  });

  // Middleware <500 error test
  it('should get an error when axios outputs an error <500', async () => {
    // Mock to get a 401 error
    const req = { path: "/questions" };
    const headers = new AxiosHeaders();
    const config = {
      url: "http://localhost:8000",
      headers
    };
    const res = {
      status: 401,
      data: {},
      statusText: "unauthorized",
      config,
      headers,
    };

    const error = new AxiosError('Unauthorized', '401', config, req, res);

    error.status = 401;
    error.message = 'Unauthorized';
    error.response = res as AxiosResponse;

    (axios.get as jest.Mock).mockRejectedValueOnce(error);

    const response = await request(app).get('/questions').send();

    expect(response.statusCode).toBe(401);
  });

  // Middleware >500 error test
  it('should get an error when axios outputs an error >500', async () => {
    // Mock to get a 501 error
    const req = { path: "/questions" };
    const headers = new AxiosHeaders();
    const config = {
      url: "http://localhost:8000",
      headers
    };
    const res = {
      status: 501,
      data: {},
      statusText: "error",
      config,
      headers,
    };

    const error = new AxiosError('Error', '501', config, req, res);

    error.status = 501;
    error.message = 'Error';
    error.response = res as AxiosResponse;

    (axios.get as jest.Mock).mockRejectedValueOnce(error);

    const response = await request(app).get('/questions').send();

    expect(response.statusCode).toBe(501);
  });

  // OpenAPI not present
  it('should get a console error if the file for OpenAPI is not present', async () => {
    console.log = jest.fn();

    jest.mock('fs');
    jest.resetModules();
    await import('../src/app');

    expect(console.log).toHaveBeenCalledWith('Not configuring OpenAPI. Configuration file not present.');
  });

  // Test POST /history endpoint with authorization header
  it('should forward history request to user service', async () => {
    const response = await request(app)
        .post('/history')
        .set('authorization', '');

    expect(response.statusCode).toBe(200);
    expect(response.body.gamesPlayed).toBe(10);
  });

  // Test POST /history endpoint with headers
  it('should forward history request to user service', async () => {
    const response = await request(app)
        .post('/history');

    expect(response.statusCode).toBe(200);
    expect(response.body.gamesPlayed).toBe(10);
  });

  // Test POST /history endpoint with authorization header
  it('should forward history request to user service', async () => {
    const response = await request(app)
        .post('/history')
        .set('authorization', '');

    expect(response.statusCode).toBe(200);
    expect(response.body.gamesPlayed).toBe(10);
  });

  // Test POST /history/increment endpoint with authorization header
  it('should forward history request to user service', async () => {
    const response = await request(app)
        .post('/history/increment')
        .set('authorization', '');

    expect(response.statusCode).toBe(200);
    expect(response.body.gamesPlayed).toBe(20);
  });

  // Test POST /profile endpoint
  it('should forward profile request to user service', async () => {
    const response = await request(app)
      .post('/profile')
      .send({ username: 'testuser', bio: 'Test' });

    expect(response.statusCode).toBe(200);
    expect(response.body.bio).toBe('Test');
  });

  // Test POST /profile endpoint down
  it('should get an error when user service is down', async () => {
    const response = await testWithoutServices(() => {
      return request(app)
          .post('/profile')
          .send({ username: 'testuser', bio: 'Test' })
    });

    expect(response.statusCode).toBe(500);
  });

  // Test GET /profile endpoint
  it('should forward history request to user service', async () => {
    const response = await request(app)
      .get('/profile')
      .query({ user: 'newuser' })
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.bio).toBe('Test');
  });

  // Test GET /profile endpoint down
  it('should get an error when user service is down', async () => {
    const response = await testWithoutServices(() => {
      return request(app)
          .get('/profile')
          .query({ user: 'newuser' })
          .send();
    });

    expect(response.statusCode).toBe(500);
  });
});

async function testWithoutServices(paramFunc : Function) {
  // Clear the mocks
  await (axios.get as jest.Mock).mockImplementation((url: string) => { if (url) return; })
  await (axios.post as jest.Mock).mockImplementation((url: string) => { if (url) return; })

  // Execute the function
  const response: Response = await paramFunc();

  // Restore original mocks
  await (axios.get as jest.Mock).mockImplementation(getMocks);
  await (axios.post as jest.Mock).mockImplementation(postMocks);

  return response;
}