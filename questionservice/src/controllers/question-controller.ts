import { Request, Response } from 'express';

/**
 * TODO
 * @param req 
 * @param res 
 */
const updateQuestion = async (req: Request, res: Response) => {
  try {
    req.body;
    res.json({ message: 'Question updated' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { updateQuestion };
