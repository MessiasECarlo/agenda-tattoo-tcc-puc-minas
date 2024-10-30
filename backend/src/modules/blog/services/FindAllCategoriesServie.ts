import { inject, injectable } from 'tsyringe';

import Category from '../infra/typeorm/entities/Category';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

@injectable()
export default class FindAllCategoriesServie {
  private categoriesRepository: ICategoriesRepository;

  constructor(
    @inject('CategoriesRepository')
    postsRepository: ICategoriesRepository
  ) {
    this.categoriesRepository = postsRepository;
  }

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.findAll();

    return categories;
  }
}
