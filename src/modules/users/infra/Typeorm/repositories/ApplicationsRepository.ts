import ICreateApplicationDTO from '@modules/users/dtos/ICreateApplicationDTO';
import IApplicationsRepository from '@modules/users/repositories/IApplicationsRepository';
import { getRepository, Repository } from 'typeorm';
import Application from '../entities/Application';

export default class ApplicationsRepository implements IApplicationsRepository {
  private ormRepository: Repository<Application>;

  constructor() {
    this.ormRepository = getRepository(Application);
  }

  async create(data: ICreateApplicationDTO): Promise<Application> {
    const application = this.ormRepository.create(data);

    await this.ormRepository.save(application);

    return application;
  }

  async save(application: Application): Promise<Application> {
    const newApplication = await this.ormRepository.save(application);

    return newApplication;
  }

  async findByUserIdAndVacancyId(userId: string, vacancyId: string): Promise<Application[] | undefined> {
    const application = await this.ormRepository.find({
      where: { userId, vacancyId },
    });

    if (application.length === 0) {
      return undefined;
    }

    return application;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
