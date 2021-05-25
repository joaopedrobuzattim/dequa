import { Router } from 'express';
import FreeUsersController from '../controllers/FreeUsersController';

const freeUsersRouter = Router();

const freeUsersController = new FreeUsersController();

freeUsersRouter.post('/', freeUsersController.create);

export default freeUsersRouter;
