import mongoose from 'mongoose';
import { IUser } from '../types';
const { userJson }  = require('kaw-users-utils');

const userSchema = new mongoose.Schema<IUser>(userJson);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
