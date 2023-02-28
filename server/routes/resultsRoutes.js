import express from 'express';
const router = express.Router();

import {
  getResult,
  storeResult,
  dropResult,
} from '../controllers/resultsController.js';

router.route('/').get(getResult).post(storeResult).delete(dropResult);

export default router;
