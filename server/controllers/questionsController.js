import Question from '../models/questions.js';
import { GoogleSpreadsheet } from 'google-spreadsheet';
// import { readFile } from 'fs/promises';

const getAllQuestions = async (req, res) => {
  // for choosing topic
  const { topic } = req.query;

  const queryObject = {
    topic,
  };

  try {
    const questions = await Question.find(queryObject);
    const total = questions.length;

    // send to frontend
    res.json({ total, questions });
  } catch (error) {
    res.json({ error });
  }
};

const insertQuestion = async (req, res) => {
  try {
    // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

    // const CREDENTIALS = JSON.parse(
    //   await readFile(new URL('../creds/credentials.json', import.meta.url))
    // );

    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join(
        '\n'
      ),
    });

    await doc.loadInfo(); // loads document properties and worksheets

    const numOfSheet = doc.sheetCount - 2;

    // console.log(numOfSheet);
    // let sheet = doc.sheetsByIndex[0];
    // let sheet = doc.sheetsByTitle['sysadmin_users&groups'];

    // let rows = await sheet.getRows();
    // let topic = await sheet.title;
    // const row = rows[11];
    // console.log(row._rawData.length === 0);

    // delete existing Questions in the database
    // await Question.deleteMany();

    for (let j = 0; j < numOfSheet; j++) {
      let sheet = doc.sheetsByIndex[j];
      let rows = await sheet.getRows();
      let topic = await sheet.title;

      for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        if (row._rawData.length === 0) {
          continue;
        }

        let question = {
          q: '',
          options: [],
          answer: '',
        };

        // question.id = row._rowNumber - 1;
        question.q = row.q_prefix + ' ' + row.question;
        question.difficulty = +row.difficulty || 0;
        question.topic = topic;

        // correct options
        question.options.push(row.Correct1 ? row.Correct1 : row.Correct2);

        // wrong options
        question.options.push(row.wrong_1);
        question.options.push(row.wrong_2);
        question.options.push(row.wrong_3);
        {
          row.wrong_4 && question.options.push(row.wrong_4);
        }

        // answer
        question.answer = row.Correct1 ? row.Correct1 : row.Correct2;

        // create new question document from googleSheets in database
        Question.create(question);
      }
    }

    // insert new Questions from googleSheets into the database
    // Question.insertMany({ questions, answers }, () => {
    //   res.json({ msg: 'data saved successfully' });
    // });

    res.json({ msg: 'data saved successfully' });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

const dropQuestion = async (req, res) => {
  try {
    // delete existing Questions in the database
    await Question.deleteMany();
    res.json('questions deleted successfully');
  } catch (error) {
    res.json({ error });
  }
};

export { getAllQuestions, insertQuestion, dropQuestion };
