const attemptsNumber = result => {
  return result.filter(r => r !== undefined).length;
};

export default attemptsNumber;
