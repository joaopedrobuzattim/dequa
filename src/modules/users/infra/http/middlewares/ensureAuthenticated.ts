import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  role: 'freeUser' | 'admin' | 'boss' | 'premiumUser';
}

function ensureAuthenticated(request: Request, _response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing!', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub, role } = decoded as ITokenPayload;

    request.user = {
      id: sub,
      role,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
}

export default ensureAuthenticated;
