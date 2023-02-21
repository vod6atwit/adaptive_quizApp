import express from 'express';
const router = express.Router();

import {
  getAllQuestions,
  insertQuestion,
  dropQuestion,
} from '../controllers/questionsController.js';

router
  .route('/')
  .get(getAllQuestions)
  .post(insertQuestion)
  .delete(dropQuestion);

export default router;
