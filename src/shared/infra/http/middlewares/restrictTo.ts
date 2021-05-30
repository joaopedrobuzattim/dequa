import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';

type RestrictToFn = (...roles: string[]) => (request: Request, _response: Response, next: NextFunction) => void;

const restrictTo: RestrictToFn = (...roles: string[]) => {
  return (request: Request, _response: Response, next: NextFunction) => {
    if (!roles.includes(request.user.role)) {
      return next(new AppError('Você não está autorizado a realizar esta ação!', 403));
    }
    return next();
  };
};

export default restrictTo;
