import { Request, Response } from 'express';

const health = (_req: Request, res: Response) => {
  res.json({
    status: 'success',
    data: {
      message: 'Service is running smoothly',
    },
  });
};

export { health };
