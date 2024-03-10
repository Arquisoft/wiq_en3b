import express from 'express';
import cors from 'cors';
import promBundle from 'express-prom-bundle';
import statusRouter from './routes/status-routes';
import authRouter from './routes/auth-routes';
import userRouter from './routes/user-routes';
import historyRouter from './routes/history-routes';
import questionRouter from './routes/question-routes';
import { notFound } from './middlewares/not-found';
import { errorHandler } from './middlewares/error-handler';

const app = express();

app.use(cors());
app.use(express.json());

//Prometheus configuration
const metricsMiddleware = promBundle({ includeMethod: true });
app.use(metricsMiddleware);

app.use(statusRouter);
app.use(authRouter);
app.use(userRouter);
app.use(historyRouter);
app.use(questionRouter);

app.all('*', notFound);

app.use(errorHandler);

export default app;
