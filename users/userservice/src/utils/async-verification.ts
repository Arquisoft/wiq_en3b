import jwt from 'jsonwebtoken';

const verifyJWT = async (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'your-secret-key', (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

export { verifyJWT };
