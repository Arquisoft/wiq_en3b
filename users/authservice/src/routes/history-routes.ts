import express from 'express';
import { updateHistory } from '../controllers/history-controller';

const router = express.Router();

router.post('/history', updateHistory);

export default router;
