const AUTH_SERVICE_URL =
  process.env.AUTH_SERVICE_URL || 'http://localhost:8002';
const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || 'http://localhost:8001';

export { AUTH_SERVICE_URL, USER_SERVICE_URL };
