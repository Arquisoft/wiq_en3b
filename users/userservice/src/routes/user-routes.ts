import express from 'express';
import { addUser, getProfile, updateProfile } from '../controllers/user-controller';
import { protect } from '../middlewares/protect-middleware';

const router = express.Router();

router.post('/adduser', addUser);
router.post('/profile', protect, updateProfile);
router.get('/profile', getProfile);

export default router;
