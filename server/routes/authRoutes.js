import express from 'express';
const router = express.Router();

import {
  register,
  login,
  logout,
  getCurrentUser,
} from '../controllers/authController.js';
import auth from '../middleware/auth.js';

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/getCurrentUser').get(auth, getCurrentUser);

export default router;
