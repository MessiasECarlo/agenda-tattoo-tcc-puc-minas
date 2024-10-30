import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenthicated';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.route('/').post(
  celebrate({
    [Segments.BODY]: {
      providerId: Joi.string().uuid().required(),
      date: Joi.date()
    }
  }),
  appointmentsController.create
);

appointmentsRouter.route('/:id').delete(
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  appointmentsController.delete
);

appointmentsRouter.route('/me').get(providerAppointmentsController.index);

export default appointmentsRouter;
