import { Router } from 'express';
import DisabilityController from '../controllers/DisabilityController';

const disabilityRouter = Router();
const disabilityController = new DisabilityController();

disabilityRouter.get('/', disabilityController.list);
disabilityRouter.get('/:id', disabilityController.getOne);

export default disabilityRouter;
