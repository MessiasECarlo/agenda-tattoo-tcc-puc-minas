import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import CreatePostController from '@modules/blog/infra/http/controllers/CreatePostController';
import FindAllPostsController from '@modules/blog/infra/http/controllers/FindAllPostsController';
import ensureAuthenthicated from '@modules/users/infra/http/middlewares/ensureAuthenthicated';

const postRouter = Router();
const findAllPostsController = new FindAllPostsController();
const createPostController = new CreatePostController();

postRouter.use(ensureAuthenthicated);

postRouter
  .route('/')
  .post(
    celebrate({
      [Segments.BODY]: {
        title: Joi.string().required(),
        content: Joi.string().required(),
        categoryId: Joi.string().required()
      }
    }),
    createPostController.create
  )
  .get(findAllPostsController.index);

export default postRouter;
