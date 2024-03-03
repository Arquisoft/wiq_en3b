import { Request, Response } from 'express';
import { generateQuestions } from '../services/question-generator';

const generateQuestionsController = async(req: Request, res: Response) => {
  try{

    const requestedParam = req.query.size;

    // A number of question ?size=x has been provided. Checking type UNDEFINED
    if(requestedParam){

      const size = parseInt(requestedParam as string, 10);
      
      if(isNaN(size))
        res.status(400).json("The size parameter must be a number")
      else{

        const randomQuestions = await generateQuestions(size);
        res.json(randomQuestions);
        
      }
      

    } else{
      res.status(418).json("You need to provide a size for questions to be generated!!")
    }

    

  } catch (error) {
    res.status(500).json("Can't generate questions!! Server Error");
  }
}

export { generateQuestionsController };
