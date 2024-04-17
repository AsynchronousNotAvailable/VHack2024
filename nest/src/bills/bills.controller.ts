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
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post('new')
  createBill(@Body() createBillDto: CreateBillDto) {
    return this.billsService.createBill(createBillDto);
  }

  @Get(':userId')
  findAll(@Param('userId', ParseIntPipe) userId: number) {
    return this.billsService.findAllByUser(userId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.billsService.findOne(+id);
  // }

  @Patch('update/:userId/:billId')
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('billId', ParseIntPipe) billId: number,
    @Body() updateBillDto: UpdateBillDto,
  ) {
    return this.billsService.updateBill(userId, billId, updateBillDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.billsService.remove(+id);
  // }
}
