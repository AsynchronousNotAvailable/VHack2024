import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import {
  AccountType,
  Budget,
  Prisma,
  TransactionCategory,
} from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BudgetsService {
  constructor(private readonly prisma: PrismaService) {}

  async createBudget(createBudgetDto: CreateBudgetDto): Promise<Budget> {
    const user = await this.prisma.user.findUnique({
      where: { id: createBudgetDto.userId },
    });
    if (!user) {
      throw new NotFoundException(
        `User with id ${createBudgetDto.userId} not found`,
      );
    }

    const createdBudget = await this.prisma.budget.create({
      data: {
        name: createBudgetDto.name,
        amount: createBudgetDto.amount,
        category: createBudgetDto.category,
        account: createBudgetDto.account,
        user: {
          connect: {
            id: createBudgetDto.userId,
          },
        },
      },
    });

    return createdBudget;
  }

  async findAllForUser(userId: number): Promise<Budget[]> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const budgets = await this.prisma.budget.findMany({
      where: { userId },
    });

    return budgets;
  }

  async findBudgetByCategory(
    userId: number,
    category: string,
  ): Promise<Budget[]> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const budgetsCategory = await this.prisma.budget.findMany({
      where: { userId, category: category as TransactionCategory },
    });

    return budgetsCategory;
  }

  async findBudgetByAccount(
    userId: number,
    account: string,
  ): Promise<Budget[]> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const budgetsAccount = await this.prisma.budget.findMany({
      where: { userId, account: account as AccountType },
    });

    return budgetsAccount;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} budget`;
  // }
}
