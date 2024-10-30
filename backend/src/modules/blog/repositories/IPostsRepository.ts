import { ICreatePostDTO } from '../dtos/ICreatePostDTO';
import Post from '../infra/typeorm/entities/Post';

export default interface IPostsRepository {
  findAll(): Promise<Post[]>;
  create(data: ICreatePostDTO): Promise<Post>;
}
