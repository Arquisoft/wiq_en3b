import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import { HISTORY_SERVICE_URL } from '../utils/constants';

const getHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authResponse = await axios.get(HISTORY_SERVICE_URL + '/history', {
      params: req.query,
    });

    res.json(authResponse.data);
  } catch (error: any) {
    next(error);
  }
};

const updateHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authResponse = await axios.post(
      HISTORY_SERVICE_URL + '/history',
      req.body
    );

    res.json(authResponse.data);
  } catch (error: any) {
    next(error);
  }
};

export { getHistory, updateHistory };
