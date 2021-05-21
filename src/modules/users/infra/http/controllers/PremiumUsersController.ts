import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePremiumUserService from '@modules/users/services/CreatePremiumUserService';

export default class PremiumUsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, cpf } = request.body;

    const createPremium = container.resolve(CreatePremiumUserService);

    const user = await createPremium.exec({ name, email, password, cpf });

    return response.status(201).json({ user });
  }
}