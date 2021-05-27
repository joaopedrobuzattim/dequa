import { Repository, getRepository } from 'typeorm';
import IDisabilitiesRepository from '@modules/disabilities/repositories/IDisabilitiesRepository';
import Disability from '../entities/Disability';

export default class DisabilitiesRepository implements IDisabilitiesRepository {
  private ormRepository: Repository<Disability>;

  constructor() {
    this.ormRepository = getRepository(Disability);
  }

  async findById(id: string): Promise<Disability | undefined> {
    const disability = await this.ormRepository.findOne(id);

    return disability;
  }

  async list(): Promise<Disability[]> {
    const disability = await this.ormRepository.find();

    return disability;
  }
}
