import { Router } from 'express';

import PremiumUsersController from '../controllers/PremiumUsersController';
import premiumUserValidations from '../middlewares/validations/premiumUserValidations';

const premiumUsersRouter = Router();

const premiumUsersController = new PremiumUsersController();

premiumUsersRouter.post('/', premiumUserValidations.createPremiumUserValidate, premiumUsersController.create);

export default premiumUsersRouter;
