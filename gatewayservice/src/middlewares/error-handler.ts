import { NextFunction, Request, Response } from 'express';

const errorHandler = (
  _err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(500).json({
    status: 'error',
    data: {
      message: `Internal server error. Service is not available.`,
    },
  });
};

export { errorHandler };
