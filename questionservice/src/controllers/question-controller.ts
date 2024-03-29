import { Request, Response } from 'express';
import { generateQuestions } from '../services/question-generator';
import { validateLanguage, validateNumber, validateSizePresent } from '../utils/validations';

const generateQuestionsController = async (req: Request, res: Response) => {
  try {
    const requestedParam = req.query.size;
    const language = req.query.lang;

    validateSizePresent(req);
    
    // If language is not present, there is no need to validate since undefined values are accepted
    if (language) {
        validateLanguage(language as string)
    }

    let size = validateNumber(requestedParam as string);

    try {
      const questions = await generateQuestions(size, language);
      res.json(questions);
    } catch (err) {
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
