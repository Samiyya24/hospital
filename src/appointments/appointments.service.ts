import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Appointment } from './models/appointment.model';

@Injectable()
export class AppointmentsService {
  constructor(@InjectModel(Appointment) private appointmentRepo:typeof Appointment){}

  create(createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentRepo.create(createAppointmentDto);
  }

  findAll() {
    return this.appointmentRepo.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.appointmentRepo.findByPk(id);
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentRepo.update(updateAppointmentDto, {
      where:{id},
      returning:true
    });
  }

  remove(id: number) {
    return this.appointmentRepo.destroy({where:{id}});
  }
}
