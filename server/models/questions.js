import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  q: {
    type: String,
  },
  options: {
    type: Array,
    default: [],
  },
  difficulty: {
    type: Number,
    default: 0,
  },
  topic: {
    type: String,
  },
  answer: {
    type: String,
  },
});

// create Question collection
export default mongoose.model('Question', QuestionSchema);
