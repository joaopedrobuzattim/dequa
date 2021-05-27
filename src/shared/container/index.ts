import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersReposiotry from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/Typeorm/repositories/UsersRepository';

import DisabilitiesRepository from '@modules/disabilities/infra/Typeorm/repositories/DisabilitiesRepository';
import IDisabilitiesRepository from '@modules/disabilities/repositories/IDisabilitiesRepository';

import VacanciesRepository from '@modules/vacancies/infra/Typeorm/repositories/VacanciesRepository';
import IVacanciesRepository from '@modules/vacancies/repositories/IVacanciesRepository';

import CategoriesRepository from '@modules/vacancies/infra/Typeorm/repositories/CategoriesRepository';
import ICategoriesRepository from '@modules/vacancies/repositories/ICategoriesRepository';

container.registerSingleton<IUsersReposiotry>('UsersRepository', UsersRepository);
container.registerSingleton<IDisabilitiesRepository>('DisabilitiesRepository', DisabilitiesRepository);
container.registerSingleton<IVacanciesRepository>('VacanciesRepository', VacanciesRepository);
container.registerSingleton<ICategoriesRepository>('CategoriesRepository', CategoriesRepository);
