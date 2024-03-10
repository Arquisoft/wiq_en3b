import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/user-routes';
import historyRouter from './routes/history-routes';

const app = express();

app.use(bodyParser.json());

app.use(userRouter);
app.use(historyRouter);

export default app;
