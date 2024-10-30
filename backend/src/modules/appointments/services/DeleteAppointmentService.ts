import { format, startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequestDTO {
  userId: string;
  appointmentId: string;
}

@injectable()
class DeleteAppointmentService {
  private appointmentsRepository: IAppointmentsRepository;

  private cacheProvider: ICacheProvider;

  constructor(
    @inject('AppointmentsRepository')
    appointmentsRepository: IAppointmentsRepository,
    @inject('CacheProvider') cacheProvider: ICacheProvider
  ) {
    this.appointmentsRepository = appointmentsRepository;
    this.cacheProvider = cacheProvider;
  }

  public async execute({ userId, appointmentId }: IRequestDTO): Promise<void> {
    const appointment = await this.appointmentsRepository.findById(
      appointmentId
    );

    if (!appointment) {
      throw new AppError({ message: 'Appointment not found!' });
    }

    if (userId !== appointment.provider_id)
      throw new AppError({
        message: "You can't delete an appointment that you aren't provider!"
      });

    const appointmentDate = startOfHour(appointment.date);
    await this.appointmentsRepository.delete(appointmentId);
    await this.cacheProvider.invalidate(
      `provider-appointments:${appointment.provider_id}:${format(
        appointmentDate,
        'yyyy-M-d'
      )}`
    );
  }
}

export default DeleteAppointmentService;
