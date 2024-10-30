import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindAllPostsServie from '@modules/blog/services/FindAllPostsService';

export default class FindAllPostsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const createPost = container.resolve(FindAllPostsServie);
    const post = await createPost.execute();

    return response.json(post);
  }
}
