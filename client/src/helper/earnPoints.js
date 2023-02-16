const earnPointsNumber = ({ result, answers, point }) => {
  return result
    .map((element, i) => answers[i] === element)
    .filter(i => i)
    .map(i => point)
    .reduce((prev, curr) => prev + curr, 0);
};

export default earnPointsNumber;
