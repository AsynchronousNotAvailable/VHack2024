import { Module } from '@nestjs/common';
import { ConsultantsService } from './consultants.service';
import { ConsultantsController } from './consultants.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ConsultantsController],
  providers: [ConsultantsService, PrismaService],
})
export class ConsultantsModule {}
