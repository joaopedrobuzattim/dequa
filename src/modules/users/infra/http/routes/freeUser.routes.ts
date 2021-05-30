import { Router } from 'express';
import FreeUsersController from '../controllers/FreeUsersController';
import freeUserValidation from '../middlewares/validations/freeUserValidations';

const freeUsersRouter = Router();

const freeUsersController = new FreeUsersController();

freeUsersRouter.post('/', freeUserValidation.createFreeUserValidate, freeUsersController.create);

export default freeUsersRouter;
