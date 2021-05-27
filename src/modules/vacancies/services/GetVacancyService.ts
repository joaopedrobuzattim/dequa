import { inject, injectable } from 'tsyringe';
import Vacancy from '../infra/Typeorm/entities/ Vacancy';
import IVacanciesRepository from '../repositories/IVacanciesRepository';

@injectable()
export default class GetVacancyService {
  constructor(
    @inject('VacanciesRepository')
    private vacanciesRepository: IVacanciesRepository,
  ) {}

  public async execute(id: string): Promise<Vacancy | undefined> {
    const vacancies = await this.vacanciesRepository.findById(id);

    return vacancies;
  }
}
