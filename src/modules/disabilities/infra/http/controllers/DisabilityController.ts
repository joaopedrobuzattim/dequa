import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetDisabilityService from '@modules/disabilities/services/GetDisabilityService';
import ListDisabilityService from '@modules/disabilities/services/ListDisabilityService';

export default class DisbilityController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listDisabilities = container.resolve(ListDisabilityService);

    const disabilities = await listDisabilities.execute();

    return response.status(200).json(disabilities);
  }

  public async getOne(request: Request, response: Response): Promise<Response> {
    const getDisability = container.resolve(GetDisabilityService);

    const { id } = request.params;

    const disability = await getDisability.execute(id);

    return response.status(200).json(disability);
  }
}
