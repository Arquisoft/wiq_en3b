import mongoose from 'mongoose';
import { IUser } from '../types';

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  history: {
    passedQuestions: { type: Number, default: 0 },
    failedQuestions: { type: Number, default: 0 },
    gamesPlayed: { type: Number, default: 0 },
    timePlayed: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
  },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
