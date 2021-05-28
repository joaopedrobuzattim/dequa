import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateUserApplicationService from '@modules/users/services/CreateUserApplicationService';

export default class UserApplicationsController {
  public async create(request: Request, response: Response): Promise<Response> {
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
