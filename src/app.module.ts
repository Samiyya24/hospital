import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminModule } from './admin/admin.module';
import { Admin } from "./admin/models/admin.model";
import { DoctorsModule } from './doctors/doctors.module';
import { Doctor } from "./doctors/models/doctor.model";
import { DepartmensModule } from './departmens/departmens.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { Departmen } from "./departmens/models/departmen.model";
import { Appointment } from "./appointments/models/appointment.model";
import { MedicalRecordsModule } from './medical_records/medical_records.module';
import { PatientsModule } from './patients/patients.module';
import { ServicesModule } from './services/services.module';
import { MedicalRecord } from "./medical_records/models/medical_record.model";
import { Patient } from "./patients/models/patient.model";
import { Service } from "./services/models/service.model";


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      models: [Admin, Doctor, Departmen, Appointment, MedicalRecord, Patient, Service],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    AdminModule,
    DoctorsModule,
    DepartmensModule,
    AppointmentsModule,
    MedicalRecordsModule,
    PatientsModule,
    ServicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
