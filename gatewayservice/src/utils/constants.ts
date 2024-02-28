const AUTH_SERVICE_URL =
  process.env.AUTH_SERVICE_URL || 'http://localhost:8002';
const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || 'http://localhost:8001';
  const HISTORY_SERVICE_URL =
  process.env.HISTORY_SERVICE_URL || 'http://localhost:8003';

export { AUTH_SERVICE_URL, USER_SERVICE_URL, HISTORY_SERVICE_URL };
