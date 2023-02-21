import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema(
  {
    topic: {
      type: 'string',
    },
    question: {
      type: Array,
      default: [],
    },
    answers: {
      type: Array,
      default: [],
    },
    difficulty: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// create Question collection
export default mongoose.model('Question', QuestionSchema);
