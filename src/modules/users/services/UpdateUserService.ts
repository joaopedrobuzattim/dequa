import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import User from '../infra/Typeorm/entities/User';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'freeUser' | 'admin' | 'premiumUser' | 'boss';
  birthDate: string;
  cpf: string;
}

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async exec({ id, name, email, password, role, cpf, birthDate }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User does not exist!', 404);
    }

    let checkIfUserExists = await this.usersRepository.findByEmail(email);

    if (checkIfUserExists && user.email !== email) {
      throw new AppError(`User ${email} already exists!`, 409);
    }

    checkIfUserExists = await this.usersRepository.findByCpf(cpf);

    if (checkIfUserExists && user.cpf !== cpf) {
      throw new AppError(`Cpf ${cpf} already exists!`, 409);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    Object.assign(user, { name, email, password: hashedPassword, role, cpf, birthDate });

    const newUser = await this.usersRepository.save(user);

    return newUser;
  }
}
