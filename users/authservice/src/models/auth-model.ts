import mongoose from 'mongoose';
const { userJson } = require('kaw-users-utils');

const userSchema = new mongoose.Schema(userJson);

const User = mongoose.model('User', userSchema);

export default User;
