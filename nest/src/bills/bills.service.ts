import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { PrismaService } from 'src/prisma.service';
import { Bill } from '@prisma/client';

@Injectable()
export class BillsService {
  constructor(private readonly prisma: PrismaService) {}
  async createBill(createBillDto: CreateBillDto): Promise<Bill> {
    const user = await this.prisma.user.findUnique({
      where: { id: createBillDto.userId },
    });
    if (!user) {
      throw new NotFoundException(
        `User with id ${createBillDto.userId} not found`,
      );
    }

    const createdBill = await this.prisma.bill.create({
      data: {
        name: createBillDto.name,
        amount: createBillDto.amount,
        repeating_option: createBillDto.repeating_option,
        user: {
          connect: {
            id: createBillDto.userId,
          },
        },
      },
    });

    return createdBill;
  }

  async findAllByUser(userId: number): Promise<Bill[]> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const bills = await this.prisma.bill.findMany({
      where: { userId },
    });

    return bills;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} bill`;
  // }

  // update(id: number, updateBillDto: UpdateBillDto) {
  //   return `This action updates a #${id} bill`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} bill`;
  // }
}