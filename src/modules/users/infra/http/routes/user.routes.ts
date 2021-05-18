import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', usersController.list);
usersRouter.get('/:id', usersController.get);
usersRouter.patch('/:id', usersController.update);
usersRouter.delete('/:id', usersController.delete);
usersRouter.post('/', usersController.create);

export default usersRouter;
