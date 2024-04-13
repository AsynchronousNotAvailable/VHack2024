import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';

import { TransactionsModule } from './transactions/transactions.module';
import { LoansModule } from './loans/loans.module';
import { ConsultantsModule } from './consultants/consultants.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, TransactionsModule, LoansModule, ConsultantsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
