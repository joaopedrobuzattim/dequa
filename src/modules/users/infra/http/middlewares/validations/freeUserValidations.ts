import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

interface IFreeUserValidation {
  createFreeUserValidate(request: Request, response: Response, next: NextFunction): Promise<NextFunction | void>;
}
export default {
  async createFreeUserValidate(request: Request, response: Response, next: NextFunction): Promise<NextFunction | void> {
    try {
      const schema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
        cpf: yup.string().required(),
        birthDate: yup.string().required(),
        disability: yup.array().of(yup.string()).required(),
      });

      await schema.validate(request.body, { stripUnknown: true });
    } catch (error) {
      const err: Error = error;
      throw new AppError(err.message, 400);
    }

    return next();
  },
} as IFreeUserValidation;
