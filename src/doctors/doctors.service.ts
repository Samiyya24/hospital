import { Injectable } from "@nestjs/common";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Doctor } from "./models/doctor.model";

@Injectable()
export class DoctorsService {
  constructor(@InjectModel(Doctor) private doctorRepo: typeof Doctor) {}
  create(createDoctorDto: CreateDoctorDto) {
    return this.doctorRepo.create(createDoctorDto);
  }

  findAll() {
    return this.doctorRepo.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.doctorRepo.findByPk(id);
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return this.doctorRepo.update(updateDoctorDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.doctorRepo.destroy({ where: { id } });
  }
}
