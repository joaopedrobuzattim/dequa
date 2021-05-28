import { getRepository, Repository } from 'typeorm';
import IVacanciesRepository from '@modules/vacancies/repositories/IVacanciesRepository';
import Vacancy from '../entities/Vacancy';

class VacanciesRepository implements IVacanciesRepository {
  private ormRepository: Repository<Vacancy>;

  constructor() {
    this.ormRepository = getRepository(Vacancy);
  }

  async list(): Promise<Vacancy[]> {
    const vacancies = await this.ormRepository.query(`
    select 
	"vacancies"."id" as id,
	"vacancies"."office" as office,
	"vacancies"."level" as level,
	"vacancies"."isRemote" as "isRemote",
	"vacancies"."office" as office,
	"vacancies"."workload" as workload,
	"vacancies"."salary" as salary,
	"vacancies"."description" as description,
	array_agg("skills"."name") as skills,
	(jsonb_agg("companies"))->0   as company,
	(jsonb_agg("categories"))->0  as category
from 
	"vacancies"
left join "companies"
on "vacancies"."companiesId" = "companies"."id"
left join "categories"
on "vacancies"."categoriesId" = "categories"."id"
left join "vacancies-skills"
on "vacancies"."id" = "vacancies-skills"."vacanciesId"
left join "skills"
on "skills"."id" = "vacancies-skills"."skillsId"
group by "vacancies"."id"
    `);

    return vacancies;
  }

  public async findById(id: string): Promise<Vacancy | undefined> {
    const vacancy = await this.ormRepository.query(
      `
    select 
	"vacancies"."id" as id,
	"vacancies"."office" as office,
	"vacancies"."level" as level,
	"vacancies"."isRemote" as "isRemote",
	"vacancies"."office" as office,
	"vacancies"."workload" as workload,
	"vacancies"."salary" as salary,
	"vacancies"."description" as description,
	array_agg("skills"."name") as skills,
	(jsonb_agg("companies"))->0   as company,
	(jsonb_agg("categories"))->0  as category
from 
	"vacancies"
left join "companies"
on "vacancies"."companiesId" = "companies"."id"
left join "categories"
on "vacancies"."categoriesId" = "categories"."id"
left join "vacancies-skills"
on "vacancies"."id" = "vacancies-skills"."vacanciesId"
left join "skills"
on "skills"."id" = "vacancies-skills"."skillsId"
WHERE "vacancies"."id" = $1
group by "vacancies"."id"
    `,
      [id],
    );

    if (vacancy.length === 0) {
      return undefined;
    }

    return vacancy;
  }

  public async findByOffice(office: string): Promise<Vacancy[]> {
    const officeCaptalized = office[0].toUpperCase() + office.substr(1).toLowerCase();

    const vacancies = await this.ormRepository.query(
      `
    select 
	"vacancies"."id" as id,
	"vacancies"."office" as office,
	"vacancies"."level" as level,
	"vacancies"."isRemote" as "isRemote",
	"vacancies"."office" as office,
	"vacancies"."workload" as workload,
	"vacancies"."salary" as salary,
	"vacancies"."description" as description,
	array_agg("skills"."name") as skills,
	(jsonb_agg("companies"))->0   as company,
	(jsonb_agg("categories"))->0  as category
from 
	"vacancies"
left join "companies"
on "vacancies"."companiesId" = "companies"."id"
left join "categories"
on "vacancies"."categoriesId" = "categories"."id"
left join "vacancies-skills"
on "vacancies"."id" = "vacancies-skills"."vacanciesId"
left join "skills"
on "skills"."id" = "vacancies-skills"."skillsId"
WHERE "vacancies"."office" LIKE '%${officeCaptalized}%' OR "vacancies"."office" LIKE '%${office}%'
group by "vacancies"."id"
    `,
    );

    return vacancies;
  }

  public async findByCategory(category: string): Promise<Vacancy[]> {
    const vacancies = await this.ormRepository.query(
      `
    select 
	"vacancies"."id" as id,
	"vacancies"."office" as office,
	"vacancies"."level" as level,
	"vacancies"."isRemote" as "isRemote",
	"vacancies"."office" as office,
	"vacancies"."workload" as workload,
	"vacancies"."salary" as salary,
	"vacancies"."description" as description,
	array_agg("skills"."name") as skills,
	(jsonb_agg("companies"))->0   as company,
	(jsonb_agg("categories"))->0  as category
from 
	"vacancies"
left join "companies"
on "vacancies"."companiesId" = "companies"."id"
left join "categories"
on "vacancies"."categoriesId" = "categories"."id"
left join "vacancies-skills"
on "vacancies"."id" = "vacancies-skills"."vacanciesId"
left join "skills"
on "skills"."id" = "vacancies-skills"."skillsId"
WHERE "categories"."name" = $1
group by "vacancies"."id"
    `,
      [category],
    );

    return vacancies;
  }
}

export default VacanciesRepository;
