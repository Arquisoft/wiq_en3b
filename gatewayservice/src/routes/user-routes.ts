import express from 'express';
import { addUser, getProfile, updateProfile } from '../controllers/user-controller';

const router = express.Router();

router.post('/adduser', addUser);
router.post('/profile', updateProfile);
router.get('/profile', getProfile);

export default router;
