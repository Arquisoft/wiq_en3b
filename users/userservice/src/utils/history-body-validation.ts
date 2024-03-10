import { Request } from 'express';
import { UserDocument } from '../types';

const validateHistoryBody = (req: Request, user: UserDocument) => {
  Object.keys(req.body.history).forEach(key => {
    if (!(key in user.history)) {
      throw new Error(
        `The provided field '${key}' is not part of the user history.`
      );
    }

    if (typeof req.body.history[key] != 'number') {
      throw new Error(
        `Invalid field '${key}'. Only numeric values are allowed.`
      );
    }

    if (req.body.history[key] < 0) {
      throw new Error(`The provided field ${key} must be a positive number.`);
    }
  });
};

export { validateHistoryBody };
