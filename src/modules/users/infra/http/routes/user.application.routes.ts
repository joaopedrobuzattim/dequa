import restrictTo from '@shared/infra/http/middlewares/restrictTo';

import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UserApplicationsController from '../controllers/UserApplicationsController';

const userApplicationRouter = Router();
const userApplicationsController = new UserApplicationsController();
const upload = multer(uploadConfig.multer);

userApplicationRouter.use(ensureAuthenticated);
// userApplicationRouter.use(restrictTo('freeUser', 'premiumUser'));
userApplicationRouter.post('/', upload.single('curriculumn'), userApplicationsController.create);

export default userApplicationRouter;
