import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import errorHandler from '../controllers/errorHandler.js';

const AuthenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "No token found, authorization denied" });
    return;
  }

  try {
    const secret = process.env.AUTH_TOKEN_SECRET || '';
    const verification = jwt.verify(token, secret);
    req.userId = verification;
    next();
  } catch (error) {
    errorHandler(res, 'Invalid token');
  }
} 

export default AuthenticateToken;