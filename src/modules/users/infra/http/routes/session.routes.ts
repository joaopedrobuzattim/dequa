import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import authenticateUserValidation from '../middlewares/validations/authenticateUserValidation';

const sessionRouter = Router();

const sessionsController = new SessionsController();

sessionRouter.post('/', authenticateUserValidation.authenticateUserValidate, sessionsController.create);

export default sessionRouter;
