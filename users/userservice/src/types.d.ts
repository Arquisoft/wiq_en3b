import { Request } from 'express';
import User from './models/user-model';
import { Document, Model, Query } from 'mongoose';

interface IUser {
  username: string;
  password: string;
  createdAt: Date;
  history: {
    passedQuestions: number;
    failedQuestions: number;
    gamesPlayed: number;
    timePlayed: number;
    points: number;
  };
}

export type UserDocument = Document<unknown, {}, IUser> &
  IUser & { _id: Types.ObjectId };

declare global {
  namespace Express {
    export interface Request {
      user?: UserDocument;
    }
  }
}
