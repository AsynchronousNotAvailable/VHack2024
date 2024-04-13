import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post('new')
  create(@Body() createLoanDto: CreateLoanDto) {
    return this.loansService.createLoan(createLoanDto);
  }

  @Get(':userId')
  findAll(@Param('userId', ParseIntPipe) userId: number) {  
    return this.loansService.findAllForUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loansService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
    return this.loansService.update(+id, updateLoanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loansService.remove(+id);
  }
}
