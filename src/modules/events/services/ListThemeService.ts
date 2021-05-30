import { inject, injectable } from 'tsyringe';
import Theme from '../infra/Typeorm/entities/Theme';
import IThemesRepository from '../repositories/IThemesRepository';

@injectable()
export default class ListThemeService {
  constructor(
    @inject('ThemesRepository')
    private themesRepository: IThemesRepository,
  ) {}

  public async execute(): Promise<Theme[]> {
    const theme = await this.themesRepository.list();

    return theme;
  }
}
