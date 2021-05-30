import { Router } from 'express';
import ThemesController from '../controllers/ThemesController';

const themesRouter = Router();
const themesController = new ThemesController();

themesRouter.get('/', themesController.list);

export default themesRouter;
