import { Repository, getRepository } from 'typeorm';
import IDisabilitiesRepository from '@modules/disabilities/repositories/IDisabilitiesRepository';
import Disability from '../entities/Disability';

export default class DisabilitiesRepository implements IDisabilitiesRepository {
  private ormRepository: Repository<Disability>;

  constructor() {
    this.ormRepository = getRepository(Disability);
  }

  public async create(name: string): Promise<Disability> {
    const disability = this.ormRepository.create({
      name,
    });

    await this.ormRepository.save(disability);

    return disability;
  }

  public async save(disability: Disability): Promise<Disability> {
    await this.ormRepository.save(disability);

    return disability;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findByName(name: string): Promise<Disability | undefined> {
    const disability = await this.ormRepository.findOne({
      where: { name },
    });

    return disability;
  }
}
