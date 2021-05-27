import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListCategoryService from '@modules/vacancies/services/ListCategoryService';

export default class CategoriesController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listCategories = container.resolve(ListCategoryService);

    const categories = await listCategories.execute();

    return response.status(200).json(categories);
  }
}
