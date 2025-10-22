import { Router } from 'express';
import { registerController, loginController, getMeController } from './auth.controller.js';
import { protect } from './auth.middleware.js';

const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/me', protect, getMeController);

export default router;