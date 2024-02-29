import { Request, Response } from 'express';

const updateHistory = async (req: Request, res: Response) => {
  //TODO This is just a placeholder.
  try {
    req.body;
    res.json({ message: 'History updated' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { updateHistory };
