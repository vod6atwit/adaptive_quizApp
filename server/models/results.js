import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema(
  {
    userName: {
      type: 'string',
    },
    resultOptions: {
      type: Array,
      default: [],
    },
    totalQuizPoint: {
      type: Number,
      default: 0,
    },
    totalQuestions: {
      type: Number,
      default: 0,
    },
    totalAttemps: {
      type: Number,
      default: 0,
    },
    earnPoints: {
      type: Number,
      default: 0,
    },
    quizResult: {
      type: 'boolean',
    },
    rank: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'please provide user'],
    },
  }
  // {
  //   timestamps: true,
  // }
);

// create Question collection
export default mongoose.model('Result', ResultSchema);
