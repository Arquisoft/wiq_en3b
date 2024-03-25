import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

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

    if (await User.findOne({ username })) {
      throw new Error(
        `There is already a user called "${username}" registered in the system`
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    const response: any = newUser;

    response.password = undefined;
    response.history = undefined;

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

export { addUser };
