import mongoose from 'mongoose';
import app from './app';

const port = 8001;

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/userdb';
mongoose.connect(mongoUri);

const server = app.listen(port, () => {
  console.log(`User Service listening at http://localhost:${port}`);
});

server.on('close', () => {
  mongoose.connection.close();
});
