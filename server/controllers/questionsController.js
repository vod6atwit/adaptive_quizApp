const getAllQuestions = (req, res) => {
  res.json('questions api get request');
};
const insertQuestion = (req, res) => {
  res.json('questions api post request');
};
const dropQuestion = (req, res) => {
  res.json('questions api delete request');
};

export { getAllQuestions, insertQuestion, dropQuestion };
