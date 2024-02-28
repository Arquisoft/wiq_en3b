import express from 'express';
import bodyParser from 'body-parser';
import authRouter from './routes/history-routes';

const app = express();

app.use(bodyParser.json());

app.use(authRouter);

export default app;
