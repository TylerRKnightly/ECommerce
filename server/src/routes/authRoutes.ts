import { Router } from 'express';
import { registerUser, loginUser, findUser } from '../controllers/authController';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/user', findUser);

export default router;
