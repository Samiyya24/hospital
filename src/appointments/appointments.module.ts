import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Appointment } from './models/appointment.model';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Appointment])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, JwtService],
})
export class AppointmentsModule {}
