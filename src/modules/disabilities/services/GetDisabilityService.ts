import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Disability from '../infra/Typeorm/entities/Disability';
import IDisabilitiesRepository from '../repositories/IDisabilitiesRepository';

@injectable()
export default class GetDisabilityService {
  constructor(
    @inject('DisabilitiesRepository')
    private disabilitiesRepository: IDisabilitiesRepository,
  ) {}

  public async execute(id: string): Promise<Disability> {
    const disability = await this.disabilitiesRepository.findById(id);

    if (!disability) {
      throw new AppError(`Deficiência não existente!`, 404);
    }

    return disability;
  }
}
