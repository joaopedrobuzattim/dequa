import { injectable, inject } from 'tsyringe';
import Disability from '../infra/Typeorm/entities/Disability';
import IDisabilitiesRepository from '../repositories/IDisabilitiesRepository';

@injectable()
export default class ListDisabilityService {
  constructor(
    @inject('DisabilitiesRepository')
    private disabilitiesRepository: IDisabilitiesRepository,
  ) {}

  public async execute(): Promise<Disability[]> {
    const disability = await this.disabilitiesRepository.list();

    return disability;
  }
}
