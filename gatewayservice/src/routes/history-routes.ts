import express from 'express';
import {
  getHistory,
  updateHistory,
  incrementHistory,
} from '../controllers/history-controller';

const router = express.Router();

router.get('/history', getHistory);
router.post('/history', updateHistory);
router.post('/history/increment', incrementHistory);

export default router;
