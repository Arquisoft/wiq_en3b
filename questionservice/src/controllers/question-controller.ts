import { Request, Response } from 'express';
import { generateQuestions } from '../services/question-generator';
import { validateNumber, validateSizePresent } from '../utils/validations';

const generateQuestionsController = async (req: Request, res: Response) => {

  try {
    const requestedParam = req.query.size;

    // A number of question ?size=x has been provided. Checking if present
    validateSizePresent(req);
    // The sieze is a number
    let size = validateNumber(requestedParam as string);
    // Obtaining questions...
    try {
      const questions = await generateQuestions(size)
      res.json(questions)
    } catch (err) { // Rethrowing error if anything occurs...
      res.status(500).json({
        status: 'error',
        message: "Can't generate questions! Internal server error",
      });
    }
  } catch (error: any) {
    res.status(400).json({ status: 'fail', data: { error: error.message } });
  }
};

export { generateQuestionsController };
