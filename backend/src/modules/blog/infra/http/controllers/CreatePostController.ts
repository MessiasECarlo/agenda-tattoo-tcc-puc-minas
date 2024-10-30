import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePostService from '@modules/blog/services/CreatePostService';

export default class CreatePostController {
  public async create(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { title, content, categoryId } = request.body;

    const createPost = container.resolve(CreatePostService);
    const post = await createPost.execute({
      title,
      content,
      categoryId,
      userId
    });

    return response.json(post);
  }
}
