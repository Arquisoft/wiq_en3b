import { Request, Response } from 'express';
import User from '../models/user-model';
import { validateRequiredFields } from '../utils/field-validations';
import { verifyJWT } from '../utils/async-verification';

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
  let auth = false;

  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer')) {
      throw new Error('You must be logged in to update your history');
    }

    const token = authorization.split(' ')[1];
    const decoded: any = await verifyJWT(token);
    const { userId } = decoded;
    const user = await User.findById(userId);

    if (user === null) {
      throw new Error("User does not exist. Log in again.'");
    }

    auth = true;

    validateRequiredFields(req, ['history']);

    user.history = { ...user.history, ...req.body.history };
    await user.save();

    res.json({ status: 'success', data: user.history });
  } catch (error) {
    const statusCode = auth ? 400 : 401;

    res.status(statusCode).json({
      status: 'fail',
      data: {
        error: (error as Error).message,
      },
    });
  }
};

export { getHistory, updateHistory };
