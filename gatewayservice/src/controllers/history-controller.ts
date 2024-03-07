import { Request, Response } from 'express';
import axios from 'axios';
import { HISTORY_SERVICE_URL } from '../utils/constants';

const updateHistory = async (req: Request, res: Response) => {
  try {
    const authResponse = await axios.post(
      HISTORY_SERVICE_URL + '/history',
      req.body
    );
    res.json(authResponse.data);
  } catch (error: any) {
    res
      .status(error.response.status)
      .json({ error: error.response.data.error });
  }
};

export { updateHistory };
