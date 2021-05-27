import { Router } from 'express';

import usersRoutes from '@modules/users/infra/http/routes/user.routes';
import freeUsersRoutes from '@modules/users/infra/http/routes/freeUser.routes';
import premiumUsersRoutes from '@modules/users/infra/http/routes/premiumUser.routes';
import sessionRoutes from '@modules/users/infra/http/routes/session.routes';
import vacancieRoutes from '@modules/vacancies/infra/http/routes/vacancy.routes';
import disabilityRoutes from '@modules/disabilities/infra/http/routes/disability.routes';
import categoryRoutes from '@modules/vacancies/infra/http/routes/category.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/freeUsers', freeUsersRoutes);
routes.use('/premiumUsers', premiumUsersRoutes);
routes.use('/session', sessionRoutes);
routes.use('/vacancies', vacancieRoutes);
routes.use('/disabilities', disabilityRoutes);
routes.use('/categories', categoryRoutes);

export default routes;
