import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {
  validateRequiredFields,
  validateNotEmpty,
  validateRequiredLength,
} from '../utils/field-validations';

import User from '../models/auth-model';

const loginUser = async (req: Request, res: Response) => {
  try {
    validateRequiredFields(req, ['username', 'password']);
    validateNotEmpty(req, ['username']);
    validateRequiredLength(req, ['password'], 8);

    const username = req.body.username.toString();
    const password = req.body.password.toString();

    // Find the user by username in the database
    const user = await User.findOne({ username });

    // Check if the user exists and verify the password
    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
        expiresIn: '1h',
      });
      // Respond with the token and user information
      res.json({ token: token, username: username, createdAt: user.createdAt });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { loginUser };
