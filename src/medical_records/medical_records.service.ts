import { Injectable } from '@nestjs/common';
import { CreateMedicalRecordDto } from './dto/create-medical_record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical_record.dto';
import { InjectModel } from '@nestjs/sequelize';
import { MedicalRecord } from './models/medical_record.model';

@Injectable()
export class MedicalRecordsService {
  constructor(@InjectModel(MedicalRecord) private medicalRecordRepo:typeof MedicalRecord){}

  create(createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.medicalRecordRepo.create(createMedicalRecordDto);
  }

  findAll() {
    return this.medicalRecordRepo.findAll({include:{all:true
    }})
  }

  findOne(id: number) {
    return  this.medicalRecordRepo.findByPk(id)
  }

  update(id: number, updateMedicalRecordDto: UpdateMedicalRecordDto) {
    return this.medicalRecordRepo.update(updateMedicalRecordDto, {
      where:{id},
      returning:true
    })
  }

  remove(id: number) {
    return this.medicalRecordRepo.destroy({where:{id}});
  }
}
