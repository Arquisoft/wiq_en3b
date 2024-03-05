import { Request, Response } from 'express';
import axios from 'axios';
import { QUESTION_SERVICE_URL } from '../utils/constants';

const getQuestions = async (_req: Request, res: Response) => {
  try {
    const questionResponse = await axios.get(
      QUESTION_SERVICE_URL + '/questions'
    );

    res.json(questionResponse.data);
  } catch (error: any) {
    console.log(error);
    res
      .status(error.response.status)
      .json({ error: error.response.data.error });
  }
};

export { getQuestions };
