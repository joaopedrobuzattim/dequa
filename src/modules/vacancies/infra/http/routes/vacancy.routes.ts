import { Router } from 'express';

import VacanciesController from '../controllers/VacanciesController';

const vacanciesRouter = Router();
const vacanciesController = new VacanciesController();

vacanciesRouter.get('/', vacanciesController.list);
vacanciesRouter.get('/:id', vacanciesController.getOne);

export default vacanciesRouter;
