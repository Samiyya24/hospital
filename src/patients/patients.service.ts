import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Patient } from './models/patient.model';

@Injectable()
export class PatientsService {
constructor(@InjectModel(Patient) private patientRepo:typeof Patient){}

  create(createPatientDto: CreatePatientDto) {
    return this.patientRepo.create(createPatientDto);
  }

  findAll() {
    return this.patientRepo.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.patientRepo.findByPk(id);
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return this.patientRepo.update(updatePatientDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.patientRepo.destroy({where:{id}});
  }
}
