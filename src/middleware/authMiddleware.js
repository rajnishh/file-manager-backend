import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    res.status(401).json({ message: 'Access Denied' });
    return; // Ensure the function exits
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if decoded is an object (as JwtPayload)
    if (typeof decoded === 'object' && decoded !== null) {
      req.user = decoded; // Assign to req.user
      next();
    } else {
      res.status(400).json({ message: 'Invalid token payload' });
    }
  } catch (error) {
    // Error handling with access to error.message if available
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'Invalid Token' });
    }
  }
};
