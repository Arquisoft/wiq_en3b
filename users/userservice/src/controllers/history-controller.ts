import { Request, Response } from 'express';
import User from '../models/user-model';
import { validateHistoryBody } from '../utils/history-body-validation';

const { validateRequiredFields } = require('kaw-users-utils');

const SERVER_ERROR_MESSAGE = "Can't access users! Internal server error";

const getHistory = async (req: Request, res: Response) => {
  try {
    if (!req.query.user) {
      throw new Error('The user parameter is missing');
    }

    const username = req.query.user.toString();

    let user;
    try {
      user = await User.findOne({ username });
    } catch (error) {
      res.status(500).json({
        status: 'fail',
        data: {
          error: SERVER_ERROR_MESSAGE,
        },
      });
      return;
    }

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

const DEFAULT_LEADERBOARD_SIZE = 10;

const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const sizeParam = req.query.size;
    let size = DEFAULT_LEADERBOARD_SIZE; // Default size if no parameter is received
    if (sizeParam) {
      size = parseInt(sizeParam as string, 10);
      if (size <= 0) {
        throw new Error('The size must be a positive value.');
      }
    }

    let leaderboard
    try {
      leaderboard = await User.find({})
          .sort({ 'history.points': -1 }) // Sort in descending order of points
          .limit(size) // Only take the first (size) users
          .select('username history'); // Select only username and history (no password, date, etc.)
    } catch (error) {
      res.status(500).json({
        status: 'fail',
        data: {
          error: SERVER_ERROR_MESSAGE,
        },
      });
      return;
    }

    res.json({
      status: 'success',
      data: {
        leaderboard
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

    validateRequiredFields(req, ['history']);
    validateHistoryBody(req, user!);

    user!.history = { ...user!.history, ...req.body.history };

    try {
      await user!.save();
    } catch (error) {
      res.status(500).json({
        status: 'fail',
        data: {
          error: "Can't update user! Internal server error",
        },
      });
      return;
    }

    res.json({ status: 'success', data: user!.history });
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

    validateRequiredFields(req, ['history']);
    validateHistoryBody(req, user!);

    Object.keys(req.body.history).forEach(key => {
      (user!.history as any)[key] += req.body.history[key];
    });

    try {
      await user!.save();
    } catch (error) {
      res.status(500).json({
        status: 'fail',
        data: {
          error: "Can't update user! Internal server error",
        },
      });
      return;
    }

    res.json({ status: 'success', data: user!.history });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      data: {
        error: (error as Error).message,
      },
    });
  }
};

export { getHistory, updateHistory, incrementHistory, getLeaderboard };
