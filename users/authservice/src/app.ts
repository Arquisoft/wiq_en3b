import express from 'express';
import bodyParser from 'body-parser';
import authRouter from './routes/auth-routes';
import historyRouter from './routes/history-routes';

const app = express();

app.use(bodyParser.json());

app.use(authRouter);
app.use(historyRouter);

export default app;
