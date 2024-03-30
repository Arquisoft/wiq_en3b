import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { validateProfileBody } from '../utils/profile-body-validation';

const {
  validateRequiredFields,
  validateNotEmpty,
  validateRequiredLength,
} = require('kaw-users-utils');

import User from '../models/user-model';

const addUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body.username.toString());
    console.log(req.body.password.toString());
    validateRequiredFields(req, ['username', 'password']);
    validateNotEmpty(req, ['username']);
    validateRequiredLength(req, ['password'], 8);

    const username = req.body.username.toString();
    const password = req.body.password.toString();

    let user;
    try {
      user = await User.findOne({ username });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        data: {
          error: "Can't access users! Internal server error",
        },
      });
      return;
    }

    if (user) {
      throw new Error(
          `There is already a user called "${username}" registered in the system`
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const bio = '';
    const pic = 0;
    
    const profile = { bio, pic };

    const newUser = new User({
      username,
      password: hashedPassword,
      profile,
    });

    try {
      await newUser.save();
    } catch (error) {
      res.status(500).json({
        status: 'error',
        data: {
          error: "Can't add user! Internal server error",
        },
      });
      return;
    }

    const response: any = newUser;

    response.password = undefined;
    response.history = undefined;
    response.profile = undefined;

    res.json({
      status: 'success',
      data: {
        user: response,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      data: {
        error: (error as Error).message,
      },
    });
  }
};

const getProfile = async (req: Request, res: Response) => {
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
        status: 'error',
        data: {
          error: "Can't access users! Internal server error",
        },
      });
      return;
    }

    if (!user) {
      throw new Error(
        `The provided user '${username}' is not registered in the application`
      );
    }

    res.json({
      status: 'success',
      data: {
        profile: user.profile,
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

const updateProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    validateRequiredFields(req, ['profile']);
    validateProfileBody(req, user!);

    user!.profile = { ...user!.profile, ...req.body.profile };

    try {
      await user!.save();
    } catch (error) {
      res.status(500).json({
        status: 'error',
        data: {
          error: "Can't update user! Internal server error",
        },
      });
      return;
    }

    res.json({ status: 'success', data: user!.profile });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      data: {
        error: (error as Error).message,
      },
    });
  }
};

export { addUser, getProfile, updateProfile };
