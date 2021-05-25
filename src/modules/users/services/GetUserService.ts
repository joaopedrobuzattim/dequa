import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '../infra/Typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class GetUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError(`User does not exist!`, 404);
    }

    return user;
  }
}
