import Results from '../models/results.js';
import { CustomAPIError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';
import { GoogleSpreadsheet } from 'google-spreadsheet';

const getResult = async (req, res) => {
  try {
    const r = await Results.find();
    res.json(r);
  } catch (error) {
    res.json({ error });
  }
};

const storeResult = async (req, res, next) => {
  try {
    // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join(
        '\n'
      ),
    });

    await doc.loadInfo(); // loads document properties and worksheets

    // let sheet = doc.sheetsByTitle('TestLog'); // get the sheet to update logs
    let sheet = doc.sheetsByIndex[6];

    const { userName, resultOptions } = req.body;

    if (!userName || !resultOptions) {
      throw new CustomAPIError('Data not provided', StatusCodes.BAD_REQUEST);
    }

    req.body.createdBy = req.user.userId;

    // create current time and save as time_end
    let time_end = new Date().toISOString();

    // save the data into mongoDB
    await Results.create(req.body);

    // create row data for google spreadsheet
    let row = {
      UserID: `${req.user.userId}`,
      UserName: `${userName}`,
      selected_options: `${resultOptions}`,
      totalQuizPoint: `${req.body.totalQuizPoint}`,
      totalQuestions: `${req.body.totalQuestions}`,
      totalAttemps: `${req.body.totalAttemps}`,
      earnPoints: `${req.body.earnPoints}`,
      quizResult: `${req.body.quizResult ? 'PASSED' : 'FAILED'} `,
      Topic: `${req.body.topic}`,
      time_end: `${time_end}`,
    };

    // add row data to google spreadsheet
    await sheet.addRow(row);

    res
      .status(StatusCodes.CREATED)
      .json({ msg: 'result saved into the database' });
  } catch (error) {
    next(error);
  }
};

const dropResult = async (req, res) => {
  try {
    await Results.deleteMany();
    res.json({ msg: 'result deleted' });
  } catch (error) {
    res.json({ error });
  }
};

export { getResult, storeResult, dropResult };
