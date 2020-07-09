import { Router } from 'express';
import { loginAccount } from './controllers';

const router = Router();

// Authentication Routes
router.post('/login', loginAccount)

// Search Routes

export default router