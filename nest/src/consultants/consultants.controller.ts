import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ConsultantsService } from './consultants.service';
import { CreateConsultantDto } from './dto/create-consultant.dto';
import { UpdateConsultantDto } from './dto/update-consultant.dto';

@Controller('consultants')
export class ConsultantsController {
  constructor(private readonly consultantsService: ConsultantsService) {}

  @Get()
  findAll() {
    return this.consultantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.consultantsService.findOne(id);
  }

  @Post('new')
  createConsultant(@Body() createConsultantDto: CreateConsultantDto) {
    return this.consultantsService.createConsultant(createConsultantDto);
  } 

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateConsultantDto: UpdateConsultantDto) {
  //   return this.consultantsService.update(+id, updateConsultantDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.consultantsService.remove(+id);
  // }
}
