import { container } from 'tsyringe';

import IUsersReposiotry from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/Typeorm/repositories/UsersRepository';

container.registerSingleton<IUsersReposiotry>('UsersRepository', UsersRepository);
