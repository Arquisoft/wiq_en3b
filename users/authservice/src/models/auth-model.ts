import mongoose from 'mongoose';
import { userJson } from 'kaw-users-utils';

const userSchema = new mongoose.Schema(userJson);

const User = mongoose.model('User', userSchema);

export default User;
