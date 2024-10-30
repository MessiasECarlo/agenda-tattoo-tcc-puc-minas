import { getRepository, Repository } from 'typeorm';

import Category from '@modules/blog/infra/typeorm/entities/Category';
import ICategoriesRepository from '@modules/blog/repositories/ICategoriesRepository';

export default class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  findById(id: string): Promise<Category | undefined> {
    return this.ormRepository.findOne(id);
  }

  findAll(): Promise<Category[]> {
    return this.ormRepository.find();
  }
}
