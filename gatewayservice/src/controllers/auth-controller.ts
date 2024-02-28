import { Request, Response } from 'express';
import axios from 'axios';
import { AUTH_SERVICE_URL } from '../utils/constants';

const login = async (req: Request, res: Response) => {
  try {
    const authResponse = await axios.post(
      AUTH_SERVICE_URL + '/login',
      req.body
    );
    res.json(authResponse.data);
  } catch (error: any) {
    res
      .status(error.response.status)
      .json({ error: error.response.data.error });
  }
};

export { login };
