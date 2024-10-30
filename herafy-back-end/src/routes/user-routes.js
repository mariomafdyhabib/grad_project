import express from 'express';
import {
  loginUser,
  registerUser,
  getUser,
} from '../controllers/user-controller.js';
import checkUser from '../middlewares/check-user.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/me', checkUser, getUser);

export default router;
