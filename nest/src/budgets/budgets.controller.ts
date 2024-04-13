import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { TransactionCategory } from '@prisma/client';

@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post('new')
  create(@Body() createBudgetDto: CreateBudgetDto) {
    return this.budgetsService.createBudget(createBudgetDto);
  }

  @Get(':userId')
  findAll(@Param('userId', ParseIntPipe) userId: number) {
    return this.budgetsService.findAllForUser(userId);
  }

  @Get('category/:userId/:category')
  findOneByCategory(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('category') category: string,
  ) {
    return this.budgetsService.findBudgetByCategory(userId, category);
  }

  @Get('account/:userId/:account')
  findOneByAccount(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('account') account: string,
  ) {
    return this.budgetsService.findBudgetByAccount(userId, account);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.budgetsService.remove(+id);
  // }
}
