import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { UserGuard } from '../guards/auth.guard';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  

  @Post()
   @UseGuards(UserGuard)
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
   @UseGuards(UserGuard)
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
   @UseGuards(UserGuard)
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @Patch(':id')
   @UseGuards(UserGuard)
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @Delete(':id')
   @UseGuards(UserGuard)
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }
}
