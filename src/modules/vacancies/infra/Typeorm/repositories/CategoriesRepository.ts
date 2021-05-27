import { getRepository, Repository } from 'typeorm';
import ICategoriesRepository from '@modules/vacancies/repositories/ICategoriesRepository';
import Category from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async list(): Promise<Category[]> {
    const categories = await this.ormRepository.find();

    return categories;
  }
}

export default CategoriesRepository;
