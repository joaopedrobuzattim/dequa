import { inject, injectable } from 'tsyringe';
import Vacancy from '../infra/Typeorm/entities/Vacancy';
import IVacanciesRepository from '../repositories/IVacanciesRepository';

@injectable()
export default class ListVacancyService {
  constructor(
    @inject('VacanciesRepository')
    private vacanciesRepository: IVacanciesRepository,
  ) {}

  public async execute(office?: string, category?: string): Promise<Vacancy[]> {
    if (office) {
      const vacancies = await this.vacanciesRepository.findByOffice(office);

      return vacancies;
    }

    if (category) {
      const vacancies = await this.vacanciesRepository.findByCategory(category);

      return vacancies;
    }

    const vacancies = await this.vacanciesRepository.list();

    return vacancies;
  }
}
