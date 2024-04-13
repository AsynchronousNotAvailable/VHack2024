import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

import { PrismaService } from 'src/prisma.service';
import { Appointment } from '@prisma/client';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}  
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
        }
      },
    });
    return appointment;
  }

  async findAll(userId: number): Promise<Appointment[]> {
    const appointments = await this.prisma.appointment.findMany({
      where: { userId: userId },
    });
    return appointments;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }


  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
