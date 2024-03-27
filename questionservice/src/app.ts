import express from 'express';
import bodyParser from 'body-parser';
import questionRouter from './routes/question-routes';
import { generateSampleTest } from './models/question-model';

const app = express();
app.disable("x-powered-by");

app.use(bodyParser.json());

app.use(questionRouter);

generateSampleTest();

export default app;
