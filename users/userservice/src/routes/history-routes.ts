import express from 'express';
import {
  getHistory,
  updateHistory,
  incrementHistory,
} from '../controllers/history-controller';
import { protect } from '../middlewares/protect-middleware';

const router = express.Router();

router.get('/history', getHistory);
router.post('/history', protect, updateHistory);
router.post('/history/increment', protect, incrementHistory);

export default router;
