import { Request, Response } from 'express';
import axios from 'axios';
import { QUESTION_SERVICE_URL } from '../utils/constants';

const getQuestions = async (req: Request, res: Response) => {
  try {
    const questionResponse = await axios.post(
      QUESTION_SERVICE_URL + '/questions',
      req.body
    );
    res.json(questionResponse.data);
  } catch (error: any) {
    res
      .status(error.response.status)
      .json({ error: error.response.data.error });
  }
};

export { getQuestions };
