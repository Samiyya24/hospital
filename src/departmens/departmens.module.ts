import { Module } from '@nestjs/common';
import { DepartmensService } from './departmens.service';
import { DepartmensController } from './departmens.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Departmen } from './models/departmen.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Departmen])],
  controllers: [DepartmensController],
  providers: [DepartmensService, JwtService],
})
export class DepartmensModule {}
