import { Request, Response } from 'express';
import { generateQuestions } from '../services/question-generator';
import { validateLanguage, validateNumber, validateSizePresent, validateTypes } from '../utils/validations';
import { getQuestionTypes } from '../services/question-storage';


const generateQuestionsController = async (req: Request, res: Response) => {
  try {
    const requestedParam = req.query.size;
    const language = req.query.lang;
    let types = req.query.type;


    validateSizePresent(req);

    // If language is not present, there is no need to validate since undefined values are accepted
    if (language) {
      validateLanguage(language as string)
    }
    // If types is not present, there is no need to validate since undefined values are accepted
    if (types) {
      if (typeof types === 'string') {
        types = [types];
      }
      types = types as string[];
      types.map((type) => type.toLowerCase());

      await validateTypes(types)
    }
    let size = validateNumber(requestedParam as string);

    try {
      const questions = await generateQuestions(size, language, types);
      res.json(questions);
    } catch (err: any) {
      res.status(500).json({
        status: 'fail',
        message: "Can't generate questions! " + err.message,
      });
    }
  } catch (error: any) {
    res.status(400).json({ status: 'fail', data: { error: error.message } });
  }
};

const getQuestionTypesController = async (_: Request, res: Response) => {
  try {
    let types = await getQuestionTypes();
    res.status(200).json({ types: types, n_types: types.length });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ status: 'fail', message: 'There was a problem obtaining types, please try again later.' });
  }
}

export { generateQuestionsController, getQuestionTypesController };
