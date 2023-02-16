const threshold = 0.6;

// pass if result percentage is greater than threshold
const flagResult = ({ totalPoints, earnPoints }) => {
  return earnPoints / totalPoints > threshold;
};

export default flagResult;
