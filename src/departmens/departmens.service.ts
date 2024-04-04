import { Injectable } from "@nestjs/common";
import { CreateDepartmenDto } from "./dto/create-departmen.dto";
import { UpdateDepartmenDto } from "./dto/update-departmen.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Departmen } from "./models/departmen.model";

@Injectable()
export class DepartmensService {
  constructor(
    @InjectModel(Departmen) private departmenRepo: typeof Departmen
  ) {}
  create(createDepartmenDto: CreateDepartmenDto) {
    return this.departmenRepo.create(createDepartmenDto);
  }

  findAll() {
    return this.departmenRepo.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.departmenRepo.findByPk(id);
  }

  update(id: number, updateDepartmenDto: UpdateDepartmenDto) {
    return this.departmenRepo.update(updateDepartmenDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.departmenRepo.destroy({ where: { id } });
  }
}
