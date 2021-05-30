import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import restrictTo from '@shared/infra/http/middlewares/restrictTo';

import ThemesController from '../controllers/ThemesController';

const themesRouter = Router();
const themesController = new ThemesController();

eventsRouter.use(ensureAuthenticated);
eventsRouter.use(restrictTo('premiumUser'));

themesRouter.get('/', themesController.list);

export default themesRouter;

