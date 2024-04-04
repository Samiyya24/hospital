import { Module } from '@nestjs/common';
import { DepartmensService } from './departmens.service';
import { DepartmensController } from './departmens.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Departmen } from './models/departmen.model';

@Module({
  imports:[SequelizeModule.forFeature([Departmen])],
  controllers: [DepartmensController],
  providers: [DepartmensService],
})
export class DepartmensModule {}
