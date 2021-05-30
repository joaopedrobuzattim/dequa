import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

interface IAuthenticateUserValidation {
  authenticateUserValidate(request: Request, response: Response, next: NextFunction): Promise<NextFunction | void>;
}

export default {
  async authenticateUserValidate(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<NextFunction | void> {
    try {
      const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
      });

      await schema.validate(request.body, { stripUnknown: true });
    } catch (error) {
      const err: Error = error;
      throw new AppError(err.message, 400);
    }

    return next();
  },
} as IAuthenticateUserValidation;
