import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import restrictTo from '@shared/infra/http/middlewares/restrictTo';
import { Router } from 'express';
import EventsController from '../controllers/EventsController';

const eventsRouter = Router();
const eventsController = new EventsController();

eventsRouter.use(ensureAuthenticated);
eventsRouter.use(restrictTo('premiumUser', 'admin'));

eventsRouter.get('/', eventsController.list);
eventsRouter.get('/:id', eventsController.getOne);

export default eventsRouter;
