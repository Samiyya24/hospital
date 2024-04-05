import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Patient } from './models/patient.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Patient])],
  controllers: [PatientsController],
  providers: [PatientsService, JwtService],
})
export class PatientsModule {}
