import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Service } from './models/service.model';
import { JwtModule,  } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Service])],
  controllers: [ServicesController],
  providers: [ServicesService, JwtModule],
})
export class ServicesModule {}
