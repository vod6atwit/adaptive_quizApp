import Results from '../models/results.js';

const getResult = async (req, res) => {
  try {
    const r = await Results.find();
    res.json(r);
  } catch (error) {
    res.json({ error });
  }
};

const storeResult = async (req, res) => {
  try {
    const { userName, result } = req.body;
    if (!userName || !result) {
      throw new Error('Data not provided');
    }

    const r = await Result.create(req.body);

    res.json({ msg: 'result created' });
  } catch (error) {
    res.json({ error });
  }
};

const dropResult = async (req, res) => {
  try {
    await Result.deleteMany();
    res.json({ msg: 'result deleted' });
  } catch (error) {
    res.json({ error });
  }
};

export { getResult, storeResult, dropResult };
