import { Router } from 'express';

import usersRoutes from '@modules/users/infra/http/routes/user.routes';
import freeUsersRoutes from '@modules/users/infra/http/routes/freeUser.routes';
import premiumUsersRoutes from '@modules/users/infra/http/routes/premiumUser.routes';
import sessionRoutes from '@modules/users/infra/http/routes/session.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/freeUsers', freeUsersRoutes);
routes.use('/premiumUsers', premiumUsersRoutes);
routes.use('/session', sessionRoutes);

export default routes;
