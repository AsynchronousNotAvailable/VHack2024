import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  Appointment,
  Bill,
  Budget,
  Loan,
  StrategyType,
  Transaction,
} from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  extra_payment?: number;
  monthly_income?: number;
  monthly_payment?: number;
  monthly_loan?: number;
  debt_free_date?: Date;
  strategy?: StrategyType;
}
