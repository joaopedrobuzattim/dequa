import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

interface IPremiumUserValidation {
  createPremiumUserValidate(request: Request, response: Response, next: NextFunction): Promise<NextFunction | void>;
}

export default {
  async createPremiumUserValidate(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<NextFunction | void> {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(8).required(),
      cpf: yup.string().required(),
      birthDate: yup.string().required(),
      disability: yup.array().of(yup.string()).required(),
    });

    try {
      await schema.validate(request.body, { stripUnknown: true });
    } catch (error) {
      const err: Error = error;
      throw new AppError(err.message, 400);
    }

    return next();
  },
} as IPremiumUserValidation;
