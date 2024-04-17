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

// libraries required for OpenAPI-Swagger
const swaggerUI = require('swagger-ui-express');
const fs = require("fs");
const YAML = require('yaml');

const app = express();
app.disable("x-powered-by");

const frontURI = process.env.WEBAPP_ENDPOINT ?? 'https://localhost';
const gatewayURI = process.env.GATEWAY_ENDPOINT ?? 'https://localhost:8000';

const corsWhitelist = [frontURI, gatewayURI, 'https://localhost', 'https://kawgame.xyz', 'https://kawgame.xyz:8000']
app.use(cors({ origin: corsWhitelist }));
app.use(express.json());

//Prometheus configuration
const metricsMiddleware = promBundle({ includeMethod: true });
app.use(metricsMiddleware);

// Routers
app.use(statusRouter);
app.use(authRouter);
app.use(userRouter);
app.use(historyRouter);
app.use(questionRouter);

// Read the OpenAPI YAML file synchronously
const openapiPath = './openapi.yaml';
if (fs.existsSync(openapiPath)) {
  const file = fs.readFileSync(openapiPath, 'utf8');

  // Parse the YAML content into a JavaScript object representing the Swagger document
  const swaggerDocument = YAML.parse(file);

  // Serve the Swagger UI documentation at the '/api-doc' endpoint
  // This middleware serves the Swagger UI files and sets up the Swagger UI page
  // It takes the parsed Swagger document as input
  app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
} else {
  console.log("Not configuring OpenAPI. Configuration file not present.");
}

// Not found router
app.all('*', notFound);
app.use(errorHandler);

export default app;
