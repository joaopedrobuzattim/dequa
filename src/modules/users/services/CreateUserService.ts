import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '../infra/Typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
  role: 'freeUser' | 'admin' | 'premiumUser' | 'boss';
  cpf: string;
  disability: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password, role, disability, cpf }: IRequest): Promise<User> {
    let checkIfUserExists = await this.usersRepository.findByEmail(email);

    if (checkIfUserExists) {
      throw new AppError(`User ${email} already exists!`, 409);
    }

    checkIfUserExists = await this.usersRepository.findByCpf(cpf);

    if (checkIfUserExists) {
      throw new AppError(`Cpf ${cpf} already exists!`, 409);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
      disability,
      cpf,
    });

    return user;
  }
}
