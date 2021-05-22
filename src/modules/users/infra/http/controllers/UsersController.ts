import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import ListUserService from '@modules/users/services/ListUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import GetUserService from '@modules/users/services/GetUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import { classToClass } from 'class-transformer';

export default class UsersController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListUserService);

    const users = await listUsers.execute();

    return response.status(200).json({ users: classToClass(users) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name, email, password, role, cpf } = request.body;

    const updateUser = container.resolve(UpdateUserService);

    const newUser = await updateUser.exec({ id, name, email, password, role, cpf });

    return response.status(201).json({ user: classToClass(newUser) });
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

    return response.status(201).json({ user: classToClass(user) });
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getUser = container.resolve(GetUserService);

    const user = await getUser.execute(id);

    return response.status(200).json({ user: classToClass(user) });
  }
}
