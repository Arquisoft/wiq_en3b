import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import { QUESTION_SERVICE_URL } from '../utils/constants';

const getQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const questionResponse = await axios.get(
      QUESTION_SERVICE_URL + '/questions',
      { params: req.query }
    );

    res.json(questionResponse.data);
  } catch (error: any) {
    next(error);
  }
};

export { getQuestions };
