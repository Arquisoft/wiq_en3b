import express from 'express';
import bodyParser from 'body-parser';
import authRouter from './routes/auth-routes';

const app = express();
app.disable("x-powered-by");

app.use(bodyParser.json());

app.use(authRouter);

export default app;
