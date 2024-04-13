import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';

import { TransactionsModule } from './transactions/transactions.module';
import { LoansModule } from './loans/loans.module';
import { ConsultantsModule } from './consultants/consultants.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { BudgetsModule } from './budgets/budgets.module';
import { BillsModule } from './bills/bills.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, TransactionsModule, LoansModule, ConsultantsModule, AppointmentsModule, BudgetsModule, BillsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
