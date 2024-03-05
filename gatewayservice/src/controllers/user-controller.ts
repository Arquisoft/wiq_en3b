import { NextFunction, Request, Response } from 'express';
import { USER_SERVICE_URL } from '../utils/constants';
import axios from 'axios';

const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userResponse = await axios.post(
      USER_SERVICE_URL + '/adduser',
      req.body
    );
    res.json(userResponse.data);
  } catch (error: any) {
    if (error.response) {
      res
        .status(error.response.status)
        .json({ error: error.response.data.error });
    } else {
      next('error');
    }
  }
};

export { addUser };
