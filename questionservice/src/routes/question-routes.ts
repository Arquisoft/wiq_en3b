import express from 'express';
import { generateQuestionsController, getQuestionTypesController } from '../controllers/question-controller';

const router = express.Router();

router.get('/questions', generateQuestionsController);

router.get('/questions/types', getQuestionTypesController);

// Default endpoint
router.get('/*', (_req, res) => {

    res.status(200).json({
        status: "success",
        data: {
            serviceName: "Question Service",
            health: "Operative",
            greet: "Hello! I think you are trying to connect to the Question Service. Pls," +
                "access through other endpoint like /questions?size=10"
        }

    });
});

export default router;
