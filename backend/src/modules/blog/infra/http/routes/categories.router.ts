import { Router } from 'express';

import FindAllCategoriesController from '@modules/blog/infra/http/controllers/FindAllCategoriesController';
import ensureAuthenthicated from '@modules/users/infra/http/middlewares/ensureAuthenthicated';

const postRouter = Router();
const findAllCategoriesController = new FindAllCategoriesController();

postRouter.use(ensureAuthenthicated);

postRouter.route('/').get(findAllCategoriesController.index);

export default postRouter;
