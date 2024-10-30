import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import DeleteAppointmentService from '@modules/appointments/services/DeleteAppointmentService';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const {
      body: { providerId, date }
    } = request;

    const createAppointment = container.resolve(CreateAppointmentService);
    const appointment = await createAppointment.execute({
      providerId,
      userId,
      date
    });

    return response.json(appointment);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const {
      params: { id }
    } = request;

    const deleteAppointment = container.resolve(DeleteAppointmentService);
    await deleteAppointment.execute({ userId, appointmentId: id });

    return response.status(204).send();
  }
}

export default AppointmentsController;
