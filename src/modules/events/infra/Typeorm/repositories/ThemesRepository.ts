import IThemesRepository from '@modules/events/repositories/IThemesRepository';
import { getRepository, Repository } from 'typeorm';
import Theme from '../entities/Theme';

export default class ThemesRepository implements IThemesRepository {
  private ormRepository: Repository<Theme>;

  constructor() {
    this.ormRepository = getRepository(Theme);
  }

  public async list(): Promise<Theme[]> {
    const themes = await this.ormRepository.find();

    return themes;
  }
}
