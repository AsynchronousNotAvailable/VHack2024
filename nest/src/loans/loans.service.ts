import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { loan } from '@prisma/client';

@Injectable()
export class LoansService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly user: UsersService,
  ) {}
  async createLoan(createLoanDto: CreateLoanDto): Promise<loan> {
    const userExist = await this.user.findOne(createLoanDto.userId);
    if (!userExist) {
      throw new NotFoundException('User not found');
    }
    const createdLoan = await this.prisma.loan.create({
      data: {
        name: createLoanDto.name,
        end_date: createLoanDto.end_date,
        repayment_date: createLoanDto.repayment_date,
        loan_amount: createLoanDto.loan_amount,
        installment_month: createLoanDto.installment_month,
        payment_remaining: createLoanDto.payment_remaining,
        interest_rate: createLoanDto.interest_rate,
        user: {
          connect: {
            id: createLoanDto.userId,
          },
        },
      },
    });
    return createdLoan;
  }

  async findAllForUser(userId: number): Promise<loan[]> {
    const userExist = await this.user.findOne(userId);
    if (userExist) {
      return this.prisma.loan.findMany({
        where: { userId: userId },
      });
    } else {
      throw new NotFoundException('User not found');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} loan`;
  }

  async update(userId: number, loanId: number, updateLoanDto: UpdateLoanDto) {
    //update loan by id
    const updatedLoan = await this.prisma.loan.update({
      where: { id: loanId, userId: userId},
      data: {
        repayment_date: updateLoanDto.repayment_date,
        loan_status: updateLoanDto.loan_status,
        payment_remaining: updateLoanDto.payment_remaining,
      },
    });

    return updatedLoan;
  }

  remove(id: number) {
    return `This action removes a #${id} loan`;
  }
}
