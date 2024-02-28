import mongoose from 'mongoose';

const typeSchema = new mongoose.Schema({
  name: { type: String,  required: true},
  query: { type: String,  required: true },
});

const userSchema = new mongoose.Schema({
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
  template: {
    type: String,
    required: true,
  },
  type: typeSchema,
});

const User = mongoose.model('User', userSchema);

export default User;
