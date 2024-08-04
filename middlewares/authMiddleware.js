import jwt from 'jsonwebtoken';

import { UnauthenticatedError } from './errorMiddlewares.js';

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication Invalid');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      userId: decoded.userId,
      name: decoded.name,
    };

    next();
  } catch (error) {
    throw new UnauthenticatedError('Not authorized to access this route');
  }
};

export { protect };
