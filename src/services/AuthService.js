import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByUsername, createUser } from '../repositories/UserRepository.js';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const registerUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return createUser({ username, password: hashedPassword });
};

export const loginUser = async (username, password) => {
  const user = await findUserByUsername(username);
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    return { token };
  }
  throw new Error('Invalid credentials');
};
