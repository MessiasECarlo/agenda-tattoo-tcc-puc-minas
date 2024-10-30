import { getRepository, Repository } from 'typeorm';

import { ICreatePostDTO } from '@modules/blog/dtos/ICreatePostDTO';
import IPostsRepository from '@modules/blog/repositories/IPostsRepository';
import User from '@modules/users/infra/typeorm/entities/User';

import Post from '../entities/Post';

export default class PostsRepostiroy implements IPostsRepository {
  private ormRepository: Repository<Post>;

  private ormUsersRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(Post);
    this.ormUsersRepository = getRepository(User);
  }

  private toDatabase(data: ICreatePostDTO): Omit<Post, 'id'> {
    return {
      title: data.title,
      content: data.content,
      category_id: data.categoryId,
      user_id: data.userId
    };
  }

  create(data: ICreatePostDTO): Promise<Post> {
    const post = this.ormRepository.create(this.toDatabase(data));

    return this.ormRepository.save(post);
  }

  public async findAll(): Promise<Post[]> {
    const posts = await this.ormRepository.find();
    const user = await this.findUsersByIds(posts.map(post => post.user_id));
    const postsWithUser = this.associateUsers(posts, user);
    return postsWithUser;
  }

  private async findUsersByIds(ids: string[]): Promise<User[]> {
    return this.ormUsersRepository.findByIds(ids, {
      select: ['id', 'name', 'email']
    });
  }

  private associateUsers(posts: Post[], users: User[]): Post[] {
    return posts.map(post => {
      const userFound = users.find(user => user.id === post.user_id);

      return {
        ...post,
        user: userFound
      };
    });
  }
}
