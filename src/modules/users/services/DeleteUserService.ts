import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<null> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError(`User does not exist!`, 404);
    }

    user.isActive = false;

    this.usersRepository.save(user);

    return null;
  }
}
