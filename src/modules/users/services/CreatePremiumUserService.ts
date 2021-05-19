import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/Typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  disability: string;
  role?: 'freeUser' | 'admin' | 'premiumUser' | 'boss';
}

@injectable()
class CreatePremiumUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async exec(data: IRequest): Promise<User> {
    let checkIfUserExists = await this.usersRepository.findByEmail(data.email);

    if (checkIfUserExists) {
      throw new AppError(`User ${data.email} already exists`, 409);
    }

    checkIfUserExists = await this.usersRepository.findByCpf(data.cpf);

    if (checkIfUserExists) {
      throw new AppError(`Cpf ${data.cpf} is already registered`, 409);
    }

    const hashedPassword = await this.hashProvider.generateHash(data.password);

    const parsedData = Object.assign(data, { role: 'premiumUser', password: hashedPassword });

    const user = await this.usersRepository.create(parsedData);

    return user;
  }
}

export default CreatePremiumUserService;
