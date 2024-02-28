import express from 'express';
import cors from 'cors';
import promBundle from 'express-prom-bundle';
import statusRouter from './routes/status-routes';
import authRouter from './routes/auth-routes';
import userRouter from './routes/user-routes';

const app = express();

app.use(cors());
app.use(express.json());

//Prometheus configuration
const metricsMiddleware = promBundle({ includeMethod: true });
app.use(metricsMiddleware);

app.get('/health', statusRouter);
app.post('/login', authRouter);
app.post('/adduser', userRouter);

export default app;
