import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindAllCategoriesServie from '@modules/blog/services/FindAllCategoriesServie';

export default class FindAllCategoriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const findAllCategories = container.resolve(FindAllCategoriesServie);
    const categories = await findAllCategories.execute();

    return response.json(categories);
  }
}
