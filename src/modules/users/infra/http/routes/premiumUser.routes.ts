import { Router } from 'express';

import PremiumUsersController from '../controllers/PremiumUsersController';

const premiumUsersRouter = Router();

const premiumUsersController = new PremiumUsersController();

premiumUsersRouter.post('/', premiumUsersController.create);

export default premiumUsersRouter;
