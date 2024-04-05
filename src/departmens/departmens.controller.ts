import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DepartmensService } from './departmens.service';
import { CreateDepartmenDto } from './dto/create-departmen.dto';
import { UpdateDepartmenDto } from './dto/update-departmen.dto';
import { UserGuard } from '../guards/auth.guard';

@Controller('departmens')
export class DepartmensController {
  constructor(private readonly departmensService: DepartmensService) {}

  @Post()
   @UseGuards(UserGuard)
  create(@Body() createDepartmenDto: CreateDepartmenDto) {
    return this.departmensService.create(createDepartmenDto);
  }

  @Get()
   @UseGuards(UserGuard)
  findAll() {
    return this.departmensService.findAll();
  }

  @Get(':id')
   @UseGuards(UserGuard)
  findOne(@Param('id') id: string) {
    return this.departmensService.findOne(+id);
  }

  @Patch(':id')
   @UseGuards(UserGuard)
  update(@Param('id') id: string, @Body() updateDepartmenDto: UpdateDepartmenDto) {
    return this.departmensService.update(+id, updateDepartmenDto);
  }

  @Delete(':id')
   @UseGuards(UserGuard)
  remove(@Param('id') id: string) {
    return this.departmensService.remove(+id);
  }
}
