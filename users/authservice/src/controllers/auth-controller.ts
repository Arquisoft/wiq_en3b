import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { validateRequiredFields } = require('kaw-users-utils');

import User from '../models/auth-model';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? 'your-secret-key';

const loginUser = async (req: Request, res: Response) => {
  try {
    validateRequiredFields(req, ['username', 'password']);

    const username = req.body.username.toString();
    const password = req.body.password.toString();

    // Find the user by username in the database
    let user;
    try {
      user = await User.findOne({ username });
    } catch (err) { // Rethrowing error if anything occurs...
      res.status(500).json({
        status: 'error',
        message: "Can't access users! Internal server error",
      });
      return;
    }

    // Check if the user exists and verify the password
    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
        expiresIn: '1h',
      });
      // Respond with the token and user information
      res.json({
        status: 'success',
        data: {
          user: { token: token, username: username, createdAt: user.createdAt },
        },
      });
    } else {
      res
        .status(401)
        .json({ status: 'fail', data: { error: 'Invalid credentials' } });
    }
  } catch (error: any) {
    res.status(400).json({ status: 'fail', data: { error: error.message } });
  }
};

export { loginUser };
