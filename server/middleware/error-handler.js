import { StatusCodes } from 'http-status-codes';

// include err and next parameter if want to catch throw errors in the routes
const errorHandlerMiddleware = (err, req, res, next) => {
  // console.log(err);

  // default error handler
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong. Try again later',
  };

  // validation Errors handler
  if (err.name === 'ValidationError') {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;

    // convert an object to array , then loop through array elements and return message variables, then join them together
    defaultError.msg = Object.values(err.errors)
      .map(item => {
        return item.message;
      })
      .join(', ');
  }

  // unique fields validation handler
  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = `${Object.keys(err.keyValue)} has to be unique`;
  }

  res.status(defaultError.statusCode).json({
    msg: defaultError.msg,
  });
};

export default errorHandlerMiddleware;
