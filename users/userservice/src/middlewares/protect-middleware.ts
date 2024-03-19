import { NextFunction, Request, Response } from 'express';
import { verifyJWT } from '../utils/async-verification';
import User from '../models/user-model';

const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer')) {
      throw new Error('You must be logged in to update your history');
    }

    const token = authorization.split(' ')[1];
    const decoded: any = await verifyJWT(token);
    const { userId } = decoded;
    const user = await User.findById(userId);

    req.user = user!;
    next();
  } catch (error: any) {
    res.status(400).json({
      status: 'fail',
      data: {
        error: (error as Error).message,
      },
    });
  }
};

export { protect };
