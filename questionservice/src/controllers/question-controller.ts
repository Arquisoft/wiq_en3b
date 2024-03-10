import { Request, Response } from 'express';
import { generateQuestions } from '../services/question-generator';

const generateQuestionsController = async (req: Request, res: Response) => {
  
  try {
    const requestedParam = req.query.size;

    // A number of question ?size=x has been provided. Checking if present
    if (requestedParam) {
      const size = parseInt(requestedParam as string, 10);

      // Checking parameter is a number
      if (isNaN(size)) {
        
        res.status(400).json({
          status: 'fail',
          data: {
            size: 'The size parameter must be a number',
          },
        });
      
      } else {
        
        // Obtaining questions...
        try{
          const questions = await generateQuestions(size)
          res.json(questions)
        
        } catch(err){ // Rethrowing error if anything occurs...
          throw err
        }

      }
    
    
    } else {
      
      res.status(400).json({
        status: 'fail',
        data: {
          size: 'You need to provide a size for questions to be generated!',
        },
      });
    
    }
  
  } catch (error) {
    
    res.status(500).json({
      status: 'error',
      message: "Can't generate questions! Internal server error",
    });
  
  }
};

export { generateQuestionsController };
