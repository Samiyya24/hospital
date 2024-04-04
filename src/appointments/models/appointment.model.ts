import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAppointmentCreateAttr {
  patient_id: number;
  doctor_id: number;
  date_visit: number;
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
    type: DataType.INTEGER,
  })
  patient_id: number;
  @Column({
    type: DataType.INTEGER,
  })
  doctor_id: number;
  @Column({
    type: DataType.INTEGER,
  })
  date_visit: number;
  @Column({
    type: DataType.STRING,
  })
  diagnosis: string;
  @Column({
    type: DataType.STRING,
  })
  treatment_plan: string;
}
