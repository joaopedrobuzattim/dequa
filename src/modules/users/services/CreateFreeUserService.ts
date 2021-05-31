import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IDisabilitiesRepository from '@modules/disabilities/repositories/IDisabilitiesRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/Typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  role?: 'freeUser' | 'admin' | 'premiumUser' | 'boss';
  birthDate: string;
  disability: string[];
}

@injectable()
class CreateFreeUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('DisabilitiesRepository')
    private disabilitiesRepository: IDisabilitiesRepository,
  ) {}

  public async exec(data: IRequest): Promise<User> {
    let checkIfUserExists = await this.usersRepository.findByEmail(data.email);

    if (checkIfUserExists) {
      throw new AppError(`Usuário ${data.email} já existe`, 409);
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

    const parsedData = Object.assign(data, { password: hashedPassword, role: 'freeUser' });

    const user = await this.usersRepository.create(parsedData);

    const disabilityInUser = Object.assign(user, { disability: disabilities });

    await this.usersRepository.save(disabilityInUser);

    return disabilityInUser;
  }
}

export default CreateFreeUserService;
