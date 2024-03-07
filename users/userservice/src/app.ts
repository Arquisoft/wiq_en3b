import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/user-routes';

const app = express();

app.use(bodyParser.json());

app.use(userRouter);

export default app;
