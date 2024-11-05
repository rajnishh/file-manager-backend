import { registerUser, loginUser } from '../services/AuthService.js';

// Helper function to check if the error is an instance of Error
const isError = (error) => {
  return error instanceof Error;
};

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    await registerUser(username, password);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (isError(error)) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Unknown error occurred' });
    }
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { token } = await loginUser(username, password);
    res.status(200).json({ token });
  } catch (error) {
    if (isError(error)) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(401).json({ error: 'Unknown error occurred' });
    }
  }
};
