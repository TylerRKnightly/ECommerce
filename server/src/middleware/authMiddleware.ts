import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { AuthenticatedRequest } from '../types/express';

export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

      // if (decoded.role === 'guest') {
      //   req.user = { role: 'guest' };
      //   return next();
      // }

      const user = await User.findById(decoded.id).select('-password') as {
        _id: string;
        name: string;
        email: string;
        role: string;
      } | null;

      if (!user) {
        res.status(401).json({ error: 'User not found' });
        return;
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Not authorized, invalid token' });
      return;
    }
  } else {
    res.status(401).json({ error: 'Not authorized, no token' });
    return;
  }
};
