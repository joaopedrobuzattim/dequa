import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import ListUserService from '@modules/users/services/ListUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

export default class UsersController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListUserService);

    const users = await listUsers.execute(true);

    return response.status(200).json(users);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    return response.status(201).json({ message: 'ok' });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute(id);

    return response.status(204).json({ data: null });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, role, cpf, disability } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password, role, cpf, disability });

    return response.status(201).json({ user });
  }

  public async get(request: Request, response: Response): Promise<Response> {
    return response.status(201).json({ message: 'ok' });
  }
}
