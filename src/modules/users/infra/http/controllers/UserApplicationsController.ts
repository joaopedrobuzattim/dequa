import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateUserApplicationService from '@modules/users/services/CreateUserApplicationService';
import AppError from '@shared/errors/AppError';

export default class UserApplicationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    if (request.multerFileFormatError) {
      throw new AppError('Invalid file format! Only png, pdf, jpeg and jpg are allowed!', 422);
    }

    const { vacancyId, linkedin } = request.body;
    const userId = request.user.id;

    const curriculumn = request.file.filename;

    const createUserApplication = container.resolve(CreateUserApplicationService);

    const application = await createUserApplication.execute({
      userId,
      vacancyId,
      linkedin,
      curriculumn,
    });

    return response.status(201).json(application);
  }
}
