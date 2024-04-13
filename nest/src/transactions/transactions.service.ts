import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { Transaction } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private user: UsersService,
  ) {}
  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    // Check if the user exists
    const userExist = await this.user.findOne(createTransactionDto.userId);
    if (!userExist) {
      throw new NotFoundException('User not found');
    }
    const createdTransaction = await this.prisma.transaction.create({
      data: {
        date: createTransactionDto.date,
        account: createTransactionDto.account,
        category: createTransactionDto.category,
        description: createTransactionDto.description,
        amount: createTransactionDto.amount,
        type: createTransactionDto.type,
        user: {
          connect: {
            id: createTransactionDto.userId,
          },
        },
      }
    });
    return createdTransaction;
  }

  async findAllForUser(userId: number): Promise<Transaction[]> {
    const userExist = await this.user.findOne(userId);
    if (userExist) {
      return this.prisma.transaction.findMany({
        where: { userId: userId },
      });
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async findByCategory(userId: number)
  {
    const userExist = await this.user.findOne(userId);
    if(!userExist) {
      throw new NotFoundException('User not found');
    }

    const transactionCategory = await this.prisma.transaction.groupBy({
      by: ['category'],
      _sum: {
        amount: true,
      },
      where: {
        userId: userId,
      },
    });

    return transactionCategory;

  } 

  // findOne(id: number) {
  //   return `This action returns a #${id} transaction`;
  // }

  // update(id: number, updateTransactionDto: UpdateTransactionDto) {
  //   return `This action updates a #${id} transaction`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} transaction`;
  // }
}
