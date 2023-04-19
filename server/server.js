import morgan from 'morgan';

import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

// make sure to use .js extension to be able to use module for ESModule

// databse
import connectDB from './db/connect.js';

// router
import authRouter from './routes/authRoutes.js';
import questionsRouter from './routes/questionsRoutes.js';
import resultsRouter from './routes/resultsRoutes.js';

// middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import auth from './middleware/auth.js';

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// body parser, reading data from body(incoming request) into req.body(in controller)
app.use(express.json());

// ROUTES
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/questions', questionsRouter);
app.use('/api/v1/results', auth, resultsRouter);

app.get('/', (req, res) => {
  res.json('get request');
});

// only run this line if app not find any routes from above
app.use(notFoundMiddleware);

// only run this line if getting errors inside the app routes
app.use(errorHandlerMiddleware);

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
    // console.log(error);
  }
};

start();
