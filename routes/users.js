import express from 'express'
import { changePassword, deleteAccount, getUserByUsername, signin, signup } from '../controllers/users.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:username', getUserByUsername)
router.post('/signin', signin);
router.post('/signup', signup)
router.delete('/delete/:id', auth, deleteAccount)
router.put('/changePassword/:id', auth, changePassword)
export default router;