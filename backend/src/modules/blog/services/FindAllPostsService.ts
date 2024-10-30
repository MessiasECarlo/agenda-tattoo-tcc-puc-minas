import { inject, injectable } from 'tsyringe';

import Post from '../infra/typeorm/entities/Post';
import IPostsRepository from '../repositories/IPostsRepository';

@injectable()
export default class FindAllPostsServie {
  private postsRepository: IPostsRepository;

  constructor(
    @inject('PostsRepository')
    postsRepository: IPostsRepository
  ) {
    this.postsRepository = postsRepository;
  }

  async execute(): Promise<Post[]> {
    const posts = await this.postsRepository.findAll();

    return posts;
  }
}
