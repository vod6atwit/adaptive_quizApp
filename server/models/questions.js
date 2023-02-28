import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema(
  {
    questions: {
      type: Array,
      default: [],
    },
    answers: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// create Question collection
export default mongoose.model('Question', QuestionSchema);
