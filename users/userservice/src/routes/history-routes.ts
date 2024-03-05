import express from 'express';
import { getHistory, updateHistory } from '../controllers/history-controller';

const router = express.Router();

router.get('/history', getHistory);
router.post('/history', updateHistory);

export default router;
