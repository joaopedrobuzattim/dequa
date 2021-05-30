import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersReposiotry from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/Typeorm/repositories/UsersRepository';

import DisabilitiesRepository from '@modules/disabilities/infra/Typeorm/repositories/DisabilitiesRepository';
import IDisabilitiesRepository from '@modules/disabilities/repositories/IDisabilitiesRepository';

import VacanciesRepository from '@modules/vacancies/infra/Typeorm/repositories/VacanciesRepository';
import IVacanciesRepository from '@modules/vacancies/repositories/IVacanciesRepository';

import CategoriesRepository from '@modules/vacancies/infra/Typeorm/repositories/CategoriesRepository';
import ICategoriesRepository from '@modules/vacancies/repositories/ICategoriesRepository';

import ApplicationsRepository from '@modules/users/infra/Typeorm/repositories/ApplicationsRepository';
import IApplicationsRepository from '@modules/users/repositories/IApplicationsRepository';

import EventsRepository from '@modules/events/infra/Typeorm/repositories/EventsRepository';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';

import ThemesRepository from '@modules/events/infra/Typeorm/repositories/ThemesRepository';
import IThemesRepository from '@modules/events/repositories/IThemesRepository';

container.registerSingleton<IUsersReposiotry>('UsersRepository', UsersRepository);

container.registerSingleton<IDisabilitiesRepository>('DisabilitiesRepository', DisabilitiesRepository);

container.registerSingleton<IVacanciesRepository>('VacanciesRepository', VacanciesRepository);

container.registerSingleton<ICategoriesRepository>('CategoriesRepository', CategoriesRepository);

container.registerSingleton<IApplicationsRepository>('ApplicationsRepository', ApplicationsRepository);

container.registerSingleton<IEventsRepository>('EventsRepository', EventsRepository);

container.registerSingleton<IThemesRepository>('ThemesRepository', ThemesRepository);
