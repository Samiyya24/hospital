import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepartmensService } from './departmens.service';
import { CreateDepartmenDto } from './dto/create-departmen.dto';
import { UpdateDepartmenDto } from './dto/update-departmen.dto';

@Controller('departmens')
export class DepartmensController {
  constructor(private readonly departmensService: DepartmensService) {}

  @Post()
  create(@Body() createDepartmenDto: CreateDepartmenDto) {
    return this.departmensService.create(createDepartmenDto);
  }

  @Get()
  findAll() {
    return this.departmensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmensService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepartmenDto: UpdateDepartmenDto) {
    return this.departmensService.update(+id, updateDepartmenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmensService.remove(+id);
  }
}
