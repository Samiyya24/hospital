import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from './models/service.model';

@Injectable()
export class ServicesService {
constructor(@InjectModel(Service) private serviceRepo:typeof Service){}

  create(createServiceDto: CreateServiceDto) {
    return this.serviceRepo.create(createServiceDto);
  }

  findAll() {
    return this.serviceRepo.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.serviceRepo.findByPk(id);
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return this.serviceRepo.update(updateServiceDto, {
      where:{id},
      returning:true
    });
  }

  remove(id: number) {
    return this.serviceRepo.destroy({where:{id}});
  }
}
