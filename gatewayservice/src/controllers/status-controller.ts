import { Request, Response } from 'express';

const health = (_req: Request, res: Response) => {
  res.json({ status: 'OK' });
};

export { health };
