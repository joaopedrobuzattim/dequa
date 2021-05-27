import Category from '../infra/Typeorm/entities/Category';

export default interface ICategoriesRepository {
  list(): Promise<Category[]>;
}
