import User from '../models/users.js';
import { CustomAPIError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // missing required fields
    if (!name || !email || !password) {
      throw new CustomAPIError(
        'Please provide all values',
        StatusCodes.BAD_REQUEST
      );
    }

    // duplicate email
    const userAlreadyExists = await User.findOne({ email });
    console.log(userAlreadyExists);
    if (userAlreadyExists) {
      throw new CustomAPIError('Email already exists', StatusCodes.BAD_REQUEST);
    }

    // generate new user in mongoDB
    // '.create' method won't work for 'select' queries in schema
    const user = await User.create({ name, email, password });

    // to be able to communicate between frontend and server
    // requests from frontend need to have token to be able to complete the requests
    const token = user.createJWT();

    // send user infos (not include password) and token back to frontend
    res.status(StatusCodes.CREATED).json({
      user: {
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // missing required fields
    if (!email || !password) {
      throw new CustomAPIError(
        'Please provide all values',
        StatusCodes.BAD_REQUEST
      );
    }

    const user = await User.findOne({ email }).select('+password');
    // console.log(user);
    if (!user) {
      throw new CustomAPIError('Invalid credentials', StatusCodes.UNAUTHORIZED);
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new CustomAPIError('Invalid credentials', StatusCodes.UNAUTHORIZED);
    }

    // to be able to communicate between frontend and server
    // requests from frontend need to have token to be able to complete the requests
    // created new token every time user is logged in ( prevent expired token )
    const token = await user.createJWT();

    // create and send cookie with response
    // attachCookie({ res, token });

    // send user infos (not include password) and token back to frontend
    res.status(StatusCodes.OK).json({
      user: {
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res, next) => {
  // TODO get req later

  res.status(StatusCodes.OK).json({ msg: 'user logged out' });
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });

    res.status(StatusCodes.OK).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};

export { register, login, logout, getCurrentUser };
