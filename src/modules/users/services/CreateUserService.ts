import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Disability from '@modules/disabilities/infra/Typeorm/entities/Disability';
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
      throw new AppError(`User ${data.email} already exists!`, 409);
    }

    checkIfUserExists = await this.usersRepository.findByCpf(data.cpf);

    if (checkIfUserExists) {
      throw new AppError(`Cpf ${data.cpf} already exists!`, 409);
    }
    const disabilities: Disability[] = [];

    const { disability } = data;

    disability.forEach(async (currentDisability) => {
      const checkIfDisabilityExists = await this.disabilitiesRepository.findById(currentDisability);

      if (checkIfDisabilityExists) disabilities.push(checkIfDisabilityExists);
    });
    const hashedPassword = await this.hashProvider.generateHash(data.password);

    const parsedData = Object.assign(data, { password: hashedPassword, disability: disabilities });

    const user = await this.usersRepository.create(parsedData);

    await this.usersRepository.save(user);

    return user;
  }
}
