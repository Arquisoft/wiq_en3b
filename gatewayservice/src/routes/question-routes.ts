import express from 'express';
import { getQuestions, getQuestionTypes } from '../controllers/question-controller';

const router = express.Router();
router.get('/questions/types', getQuestionTypes);
router.get('/questions', getQuestions);

export default router;
