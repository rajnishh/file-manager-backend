import logger from '../config/logger.js';
import User from '../models/User.js';

export const findUserByUsername = async (username) => User.findOne({ username });

export const createUser = async (userData) => {
  const user = new User(userData);
  return user.save();
};

export const getUserIdByUsername = async (username) => {
  const user = await User.findOne({ username });
  logger.info(user);
  return user ? user._id : null;
};


