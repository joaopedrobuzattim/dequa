import ICreateApplicationDTO from '../dtos/ICreateApplicationDTO';
import Application from '../infra/Typeorm/entities/Application';

export default interface IApplicationsRepository {
  create(data: ICreateApplicationDTO): Promise<Application>;
  save(application: Application): Promise<Application>;
  findByUserIdAndVacancyId(userId: string, vacancyId: string): Promise<Application[] | undefined>;
  delete(id: string): Promise<void>;
}
