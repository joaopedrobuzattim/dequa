import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListThemeService from '@modules/events/services/ListThemeService';

export default class ThemesController {
  async list(request: Request, response: Response): Promise<Response> {
    const listThemes = await container.resolve(ListThemeService);

    const themes = await listThemes.execute();

    return response.status(200).json(themes);
  }
}
