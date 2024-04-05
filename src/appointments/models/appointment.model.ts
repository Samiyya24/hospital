import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Patient } from "../../patients/models/patient.model";
import { Service } from "../../services/models/service.model";
import { Doctor } from "../../doctors/models/doctor.model";

interface IAppointmentCreateAttr {
  patient_id: number;
  doctor_id: number;
  date_visit: string;
  diagnosis: string;
  treatment_plan: string;
}
@Table({ tableName: "appointment" })
export class Appointment extends Model<Appointment, IAppointmentCreateAttr> {
  @ApiProperty({
    example: 1,
    description: "Foydalanuvchining ID unical raqamai",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({
    type: DataType.STRING,
  })
  date_visit: string;
  @Column({
    type: DataType.STRING,
  })
  diagnosis: string;
  @Column({
    type: DataType.STRING,
  })
  treatment_plan: string;

  @ApiProperty({ example: 1, description: "unikal ID - raqami" })
  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
  })
  patient_id: number;
  @BelongsTo(() => Patient)
  patient: Patient;

  @ApiProperty({ example: 1, description: "unikal ID - raqami" })
  @ForeignKey(() => Service)
  @Column({
    type: DataType.INTEGER,
  })
  service_id: number;
  @BelongsTo(() => Service)
  service: Service;

  @ApiProperty({ example: 1, description: "unikal ID - raqami" })
  @ForeignKey(() => Doctor)
  @Column({
    type: DataType.INTEGER,
  })
  doctor_id: number;
  @BelongsTo(() => Doctor)
  doctor: Doctor;
}
