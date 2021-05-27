import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListVacancyService from '@modules/vacancies/services/ListVacancyService';
import GetVacancyService from '@modules/vacancies/services/GetVacancyService';

export default class VacanciesController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listVacancies = container.resolve(ListVacancyService);

    if (request.query.office) {
      const office = String(request.query.office);
      const filteredVacancies = await listVacancies.execute(office, undefined);
      return response.status(200).json(filteredVacancies);
    }
    if (request.query.category) {
      const category = String(request.query.category);
      const filteredVacancies = await listVacancies.execute(undefined, category);
      return response.status(200).json(filteredVacancies);
    }

    const vacancies = await listVacancies.execute();

    return response.status(200).json(vacancies);
  }

  public async getOne(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getVacancy = container.resolve(GetVacancyService);

    const vacancy = await getVacancy.execute(id);

    return response.status(200).json(vacancy);
  }
}
