import express from 'express';
import { updateQuestion } from '../controllers/question-controller';

const router = express.Router();

router.post('/questions', updateQuestion);

export default router;