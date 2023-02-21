import morgan from 'morgan';

import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

// make sure to use .js extension to be able to use module for ESModule

// databse
import connectDB from './db/connect.js';

// router
// import authRouter from './routes/authRoutes.js';
import questionsRouter from './routes/questionsRoutes.js';

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// body parser, reading data from body(incoming request) into req.body(in controller)
app.use(express.json());

// ROUTES
// app.use('/api/v1/auth', authRouter);
app.use('/api/v1/questions', questionsRouter);

app.get('/', (req, res) => {
  res.json('get request');
});

const port = process.env.PORT || 4444;
const start = async () => {
  try {
    await connectDB(
      process.env.MONGO_URL.replace(
        '<password>',
        process.env.MONGO_URL_PASSWORD
      )
    );
    console.log('database connected');
    app.listen(port, () => {
      console.log(`server listening on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
