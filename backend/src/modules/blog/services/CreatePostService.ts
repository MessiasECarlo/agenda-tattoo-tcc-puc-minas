import { inject, injectable } from 'tsyringe';

import ICategoriesRepository from '../repositories/ICategoriesRepository';
import IPostsRepository from '../repositories/IPostsRepository';

interface IRequestDTO {
  title: string;
  content: string;
  categoryId: string;
  userId: string;
}

@injectable()
export default class CreatePostService {
  private postsRepository: IPostsRepository;

  private categoriesRepository: ICategoriesRepository;

  constructor(
    @inject('PostsRepository')
    postsRepository: IPostsRepository,
    @inject('CategoriesRepository')
    categoriesRepository: ICategoriesRepository
  ) {
    this.postsRepository = postsRepository;
    this.categoriesRepository = categoriesRepository;
  }

  async execute({ title, content, categoryId, userId }: IRequestDTO) {
    const category = await this.categoriesRepository.findById(categoryId);

    if (!category) {
      throw new Error('Category not found');
    }

    const post = await this.postsRepository.create({
      title,
      content,
      categoryId,
      userId
    });

    return post;
  }
}
