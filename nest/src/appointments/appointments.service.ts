import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

import { PrismaService } from 'src/prisma.service';
import { appointment } from '@prisma/client';
import { ConsultantsService } from 'src/consultants/consultants.service';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly consultant: ConsultantsService,
  ) {}
  async createAppointment(createAppointmentDto: CreateAppointmentDto) {
    const appointment = await this.prisma.appointment.create({
      data: {
        time: createAppointmentDto.time,
        user: {
          connect: {
            id: createAppointmentDto.userId,
          },
        },
        consultant: {
          connect: {
            id: createAppointmentDto.consultantId,
          },
        },
      },
    });
    return appointment;
  }

  async findAll(userId: number) {
    const appointments = await this.prisma.appointment.findMany({
      where: { userId: userId },
    });

    const processedAppointments = await Promise.all(
      appointments.map(async (appointment) => {
        const consultant = await this.consultant.findOne(
          appointment.consultantId,
        );
        return {
          id: appointment.id,
          time: appointment.time,
          consultant: consultant,
        };
      }),
    );

    console.log(processedAppointments);
    return processedAppointments;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
