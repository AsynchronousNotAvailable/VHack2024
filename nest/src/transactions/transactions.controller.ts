import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('new')
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.createTransaction(createTransactionDto);
  }

  @Get(':userId')
  findAll(@Param('userId', ParseIntPipe) userId: number) {
    return this.transactionsService.findAllForUser(userId);
  }

  @Get('category/:userId/:month')
  findByCategory(@Param('userId', ParseIntPipe) userId: number, @Param('month', ParseIntPipe) month: number){
    return this.transactionsService.findByCategory(userId, month);
  }

  @Get(':userId/:year/:month')
  getTransactionsByMonth(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('year', ParseIntPipe) year: number,
    @Param('month', ParseIntPipe) month: number,
  ) {
    return this.transactionsService.getTransactionsByMonth(userId, year, month);
  }

  @Get(':userId/:year/:month/category')
  getMonthlyTransactionsByCategory(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('year', ParseIntPipe) year: number,
    @Param('month', ParseIntPipe) month: number,
  ) {
    return this.transactionsService.getMonthlyTransactionsByCategory(
      userId,
      year,
      month,
    );
  }

  @Get(':userId/:year/:month/account')
  getMonthlyTransactionsByAccount(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('year', ParseIntPipe) year: number,
    @Param('month', ParseIntPipe) month: number,
  ) {
    return this.transactionsService.getMonthlyTransactionsByAccount(
      userId,
      year,
      month,
    );
  }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.transactionsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
  //   return this.transactionsService.update(+id, updateTransactionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.transactionsService.remove(+id);
  // }
}
