import { Router } from 'express';

import restrictTo from '@shared/infra/http/middlewares/restrictTo';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.use(ensureAuthenticated);
usersRouter.use(restrictTo('admin'));

usersRouter.get('/', usersController.list);
usersRouter.get('/:id', usersController.get);
usersRouter.patch('/:id', usersController.update);
usersRouter.delete('/:id', usersController.delete);
usersRouter.post('/', usersController.create);

export default usersRouter;
