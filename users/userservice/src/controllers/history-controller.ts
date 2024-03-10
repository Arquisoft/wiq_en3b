import { Request, Response } from 'express';
import User from '../models/user-model';
import { validateRequiredFields } from '../utils/field-validations';
import { validateHistoryBody } from '../utils/history-body-validation';

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

const updateHistory = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error('Unknown error. User does not appear.');
    }

    validateRequiredFields(req, ['history']);
    validateHistoryBody(req, user);

    user.history = { ...user.history, ...req.body.history };
    await user.save();

    res.json({ status: 'success', data: user.history });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      data: {
        error: (error as Error).message,
      },
    });
  }
};

const incrementHistory = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error('Unknown error. User does not appear.');
    }

    validateRequiredFields(req, ['history']);
    validateHistoryBody(req, user);

    Object.keys(req.body.history).forEach(key => {
      (user.history as any)[key] += req.body.history[key];
    });

    await user.save();

    res.json({ status: 'success', data: user.history });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      data: {
        error: (error as Error).message,
      },
    });
  }
};

export { getHistory, updateHistory, incrementHistory };
