import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import {
  validateRequiredFields,
  validateNotEmpty,
  validateRequiredLength,
} from '../utils/field-validations';
import User from '../models/user-model';

const addUser = async (req: Request, res: Response) => {
  try {
    validateRequiredFields(req, ['username', 'password']);
    validateNotEmpty(req, ['username']);
    validateRequiredLength(req, ['password'], 8);

    const { username, password } = req.body;

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
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export { addUser };
