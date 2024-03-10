import { Request, Response } from 'express';

const notFound = (req: Request, res: Response) => {
  res.status(404).json({
    status: 'fail',
    data: {
      message: `Route ${req.path} not found`,
    },
  });
};

export { notFound };
