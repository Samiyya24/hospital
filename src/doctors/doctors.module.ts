import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Doctor } from './models/doctor.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Doctor]),
    JwtModule.register({}),
    MailModule,
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService, JwtService],
})
export class DoctorsModule {}
