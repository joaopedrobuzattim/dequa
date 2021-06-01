import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IDisabilitiesRepository from '@modules/disabilities/repositories/IDisabilitiesRepository';
import User from '../infra/Typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
  role: 'freeUser' | 'admin' | 'premiumUser' | 'boss';
  cpf: string;
  birthDate: string;
  disability: string[];
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('DisabilitiesRepository')
    private disabilitiesRepository: IDisabilitiesRepository,
  ) {}

  public async execute(data: IRequest): Promise<User> {
    let checkIfUserExists = await this.usersRepository.findByEmail(data.email);

    if (checkIfUserExists) {
      throw new AppError(`Usuário ${data.email} já existe!`, 409);
    }

    checkIfUserExists = await this.usersRepository.findByCpf(data.cpf);

    if (checkIfUserExists) {
      throw new AppError(`Cpf ${data.cpf} já está registrado!`, 409);
    }

    const disabilities = await this.disabilitiesRepository.findById(data.disability[0]);

    if (!disabilities) {
      throw new AppError(`Deficiência não existente!`, 404);
    }

    const hashedPassword = await this.hashProvider.generateHash(data.password);

    const parsedData = Object.assign(data, { password: hashedPassword, disability: [disabilities] });

    const user = await this.usersRepository.create(parsedData);

    return user;
  }
}
