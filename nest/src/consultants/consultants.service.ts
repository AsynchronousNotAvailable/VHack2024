import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConsultantDto } from './dto/create-consultant.dto';
import { UpdateConsultantDto } from './dto/update-consultant.dto';
import { PrismaService } from 'src/prisma.service';
import { Cons } from 'rxjs';
import { consultant } from '@prisma/client';

@Injectable()
export class ConsultantsService {
  constructor(private readonly prisma: PrismaService) {}
  // create(createConsultantDto: CreateConsultantDto) {
  //   return 'This action adds a new consultant';
  // }

  async findAll(): Promise<consultant[]> {
    return this.prisma.consultant.findMany();
  }

  async findOne(id: number): Promise<consultant> {
    const consultant = await this.prisma.consultant.findUnique({
      where: { id },
    });
    if (!consultant) {
      throw new NotFoundException(`Consultant with ID ${id} not found`);
    }
    return consultant;
  }

  async createConsultant(data: CreateConsultantDto): Promise<consultant> {
    return this.prisma.consultant.create({data});
  }
  // update(id: number, updateConsultantDto: UpdateConsultantDto) {
  //   return `This action updates a #${id} consultant`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} consultant`;
  // }
}
