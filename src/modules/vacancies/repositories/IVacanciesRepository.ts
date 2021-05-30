import Vacancy from '../infra/Typeorm/entities/Vacancy';

export default interface IVacanciesRepository {
  list(): Promise<Vacancy[]>;
  findById(id: string): Promise<Vacancy[] | undefined>;
  findByOffice(office: string): Promise<Vacancy[]>;
  findByCategory(category: string): Promise<Vacancy[]>;
}
