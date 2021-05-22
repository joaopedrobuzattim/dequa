import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateFreeUserService from '@modules/users/services/CreateFreeUserService';

export default class FreeUsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, cpf, disability } = request.body;

    const createFree = container.resolve(CreateFreeUserService);

    const user = await createFree.exec({ name, email, password, cpf, disability });

    return response.status(201).json({ user: classToClass(user) });
  }
}
