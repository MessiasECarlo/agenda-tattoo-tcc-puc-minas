import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import categoriesRouter from '@modules/blog/infra/http/routes/categories.router';
import postsRouter from '@modules/blog/infra/http/routes/posts.router';
import passwordRouter from '@modules/users/infra/http/routes/passwords.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
// import '../../../../modules/blog/infra/http/routers/categories.router';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/categories', categoriesRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/posts', postsRouter);
routes.use('/profile', profileRouter);
routes.use('/providers', providersRouter);

export default routes;
