import morgan from 'morgan';

import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// body parser, reading data from body(incoming request) into req.body(in controller)
app.use(express.json());

const port = process.env.PORT || 4444;

app.get('/', (req, res) => {
  res.json('get request');
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
