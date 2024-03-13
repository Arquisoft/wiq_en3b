import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { AUTH_SERVICE_URL } from '../utils/constants';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authResponse = await axios.post(
      AUTH_SERVICE_URL + '/login',
      req.body
    );
    res.json(authResponse.data);
  } catch (error: any) {
    next(error);
  }
};

export { login };
