import User from '../models/User.js';

export const findUserByUsername = async (username) => User.findOne({ username });

export const createUser = async (userData) => {
  const user = new User(userData);
  return user.save();
};
