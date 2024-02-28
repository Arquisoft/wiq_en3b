import express from 'express';
import bodyParser from 'body-parser';
import questionRouter from './routes/question-routes';

const app = express();

app.use(bodyParser.json());

app.use(questionRouter);

export default app;
