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
  console.log(authHeader);
  console.log('Chegou aqui');
  if (!authHeader) {
    console.log('Chegou aqui 2 ');
    throw new AppError('JWT token ausente!', 401);
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
    throw new AppError('JWT token invalido!', 401);
  }
}

export default ensureAuthenticated;
