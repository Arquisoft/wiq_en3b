import { Request, Response } from 'express';
import User from '../models/user-model';
import {
  validateRequiredFields,
  validateNotEmpty,
} from '../utils/field-validations';

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
    validateRequiredFields(req, ['username', 'history']);
    validateNotEmpty(req, ['username']);

    const username = req.body.username;

    const updatedUser = await User.findOneAndUpdate(
        { username },
        { $set: { history: req.body.history } },
        { new: true }
    );

    if (!updatedUser) {
      throw new Error(
          `The provided user '${username}' is not registered in the application`
      );
    }

    res.json({ status: 'success', data: null});
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      data: {
        error: (error as Error).message,
      },
    });
  }
};

export { getHistory, updateHistory };
