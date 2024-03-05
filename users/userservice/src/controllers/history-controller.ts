import { Request, Response } from 'express';
import User from '../models/user-model';

const getHistory = async (req: Request, res: Response) => {
  try {
    if (!req.query.user) {
      throw new Error('The user parameter is missing');
    }

    const username = req.query.user.toString();
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error(
        `The provided user \'${username}\' is not registered in the application`
      );
    }

    res.json({
      status: 'success',
      data: {
        history: user.history,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'fail',
      data: {
        error: error.message,
      },
    });
  }
};

const updateHistory = async (_req: Request, res: Response) => {
  try {
    res.json({ status: 'success', data: { history: 'To be done' } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

export { getHistory, updateHistory };
