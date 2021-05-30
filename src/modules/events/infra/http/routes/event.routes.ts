import { Router } from 'express';
import EventsController from '../controllers/EventsController';

const eventsRouter = Router();
const eventsController = new EventsController();

eventsRouter.get('/', eventsController.list);
eventsRouter.get('/:id', eventsController.getOne);

export default eventsRouter;
