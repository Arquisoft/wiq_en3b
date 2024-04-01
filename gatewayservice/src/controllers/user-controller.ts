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
    next(error);
  }
};

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userResponse = await axios.get(USER_SERVICE_URL + '/profile', {
      params: req.query,
    });
    res.json(userResponse.data);
  } catch (error: any) {
    next(error);
  }
};

const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userResponse = await axios.post(
      USER_SERVICE_URL + '/profile',
      req.body,
      {
        headers: {
          authorization: req.headers?.['authorization'] ?? '',
        },
      }
    );
    res.json(userResponse.data);
  } catch (error: any) {
    next(error);
  }
};

export { addUser, getProfile, updateProfile };
