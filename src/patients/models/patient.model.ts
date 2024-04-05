import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Appointment } from "../../appointments/models/appointment.model";
import { MedicalRecord } from "../../medical_records/models/medical_record.model";

interface IPatientCreateAttr {
  first_name: string;
  last_name: string;
  birth_day: string;
  gender: string;
  address: string;
  phone_number: string;
  email: string;
  hashed_password: string;
}
@Table({ tableName: "patient" })
export class Patient extends Model<Patient, IPatientCreateAttr> {
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
  first_name: string;
  @Column({
    type: DataType.STRING,
  })
  last_name: string;
  @Column({
    type: DataType.STRING,
  })
  birth_day: string;
  @Column({
    type: DataType.STRING,
  })
  gender: string;
  @Column({
    type: DataType.STRING,
  })
  address: string;
  @Column({
    type: DataType.STRING,
  })
  phone_number: string;
  @Column({
    type: DataType.STRING,
  })
  email: string;
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;
  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  @HasMany(() => Appointment)
  appointment: Appointment[];

  @HasMany(() => MedicalRecord)
  medicalRecord: MedicalRecord[];
}