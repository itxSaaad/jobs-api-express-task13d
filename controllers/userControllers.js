import { StatusCodes } from 'http-status-codes';

import {
  BadRequestError,
  UnauthenticatedError,
} from '../middlewares/errorMiddlewares.js';

import User from '../models/userModel.js';

// @desc    Login user
// @route   POST /api/v1/users/login
// @access  Public

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  // compare password
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

// @desc    Register user
// @route   POST /api/v1/users/register
// @access  Public

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError('Please provide name, email and password');
  }

  let user = await User.findOne({ email });

  if (user) {
    throw new BadRequestError('User already exists');
  }

  user = await User.create({ name, email, password });

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

export { login, register };
