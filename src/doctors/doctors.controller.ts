import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { UserGuard } from 'src/guards/auth.guard';

@Controller('doctors')
export class DoctorsController {
   constructor(private readonly doctorsService: DoctorsService) { }

   @Post()
   @UseGuards(UserGuard)
   create(@Body() createDoctorDto: CreateDoctorDto) {
      return this.doctorsService.create(createDoctorDto);
   }

   @Get()
   @UseGuards(UserGuard)
   findAll() {
      return this.doctorsService.findAll();
   }

   @Get(':id')
   @UseGuards(UserGuard)
   findOne(@Param('id') id: string) {
      return this.doctorsService.findOne(+id);
   }

   @Patch(':id')
   @UseGuards(UserGuard)
   update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
      return this.doctorsService.update(+id, updateDoctorDto);
   }

   @Delete(':id')
   @UseGuards(UserGuard)
   remove(@Param('id') id: string) {
      return this.doctorsService.remove(+id);
   }
}
