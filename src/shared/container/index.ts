import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersReposiotry from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/Typeorm/repositories/UsersRepository';
import DisabilitiesRepository from '@modules/disabilities/infra/Typeorm/repositories/DisabilitiesRepository';
import IDisabilitiesRepository from '@modules/disabilities/repositories/IDisabilitiesRepository';

container.registerSingleton<IUsersReposiotry>('UsersRepository', UsersRepository);
container.registerSingleton<IDisabilitiesRepository>('DisabilitiesRepository', DisabilitiesRepository);
