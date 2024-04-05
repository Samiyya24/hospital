import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Patient } from './models/patient.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Patient]),
    JwtModule.register({}),
    MailModule,
  ],
  controllers: [PatientsController],
  providers: [PatientsService, JwtService],
})
export class PatientsModule {}
