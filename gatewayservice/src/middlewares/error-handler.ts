import { AxiosError } from 'axios';
import { NextFunction, Request, Response } from 'express';

const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AxiosError && err.response) {
    const statusCode = err.response.status;

    if (statusCode < 500) {
      res.status(statusCode).json({
        status: 'fail',
        data: err.response.data.data,
      });
    } else {
      res.status(statusCode).json({
        status: 'error',
        message: err.response.data.message,
      });
    }

    return;
  }

  res.status(500).json({
    status: 'error',
    message: `Internal server error. Service is not available.`,
  });
};

export { errorHandler };
