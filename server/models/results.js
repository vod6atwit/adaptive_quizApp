import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema(
  {
    userName: {
      type: 'string',
    },
    result: {
      type: Array,
      default: [],
    },
    points: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
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
  },
  {
    timestamps: true,
  }
);

// create Question collection
export default mongoose.model('Result', ResultSchema);
