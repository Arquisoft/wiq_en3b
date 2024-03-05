import { Request, Response } from 'express';

const updateHistory = async (_req: Request, res: Response) => {
  try {
    res.json({ status: 'success', data: { history: 'To be done' } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

export { updateHistory };
