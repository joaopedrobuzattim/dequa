import Theme from '../infra/Typeorm/entities/Theme';

export default interface IThemesRepository {
  list(): Promise<Theme[]>;
}
