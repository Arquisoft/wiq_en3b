import express from 'express';
import cors from 'cors';
import promBundle from 'express-prom-bundle';
import statusRouter from './routes/status-routes';
import authRouter from './routes/auth-routes';
import userRouter from './routes/user-routes';
import historyRouter from './routes/history-routes';
import questionRouter from './routes/question-routes';

const app = express();

app.use(cors());
app.use(express.json());

//Prometheus configuration
const metricsMiddleware = promBundle({ includeMethod: true });
app.use(metricsMiddleware);

app.get('/health', statusRouter);
app.post('/login', authRouter);
app.post('/adduser', userRouter);
app.post('/history', historyRouter);
app.post('/questions', questionRouter)

export default app;
