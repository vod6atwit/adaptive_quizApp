const threshold = 0.7; // if you get 70% total point of your test, you will pass the test

// pass if result percentage is greater than threshold
const flagResult = ({ totalPoints, earnPoints }) => {
  return earnPoints / totalPoints > threshold;
};

export default flagResult;
