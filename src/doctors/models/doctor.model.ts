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
import { Appointment } from "../../appointments/models/appointment.model";
import { Departmen } from "../../departmens/models/departmen.model";

interface IDoctorCreateAttr {
  first_name: string;
  last_name: string;
  specialization: string;
  departmentID: number;
  phone_number: string;
  email: string;
  address: string;
  is_active: boolean;
  room: string;
  password: string;
  hashed_refresh_token: string;
  hashed_password: string;
}
@Table({ tableName: "doctors" })
export class Doctor extends Model<Doctor, IDoctorCreateAttr> {
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

  @ApiProperty({
    example: "Sobir",
    description: "Foydalanuvchining ismi",
  })
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
  specialization: string;
  @Column({
    type: DataType.INTEGER,
  })
  departmentID: number;
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
  address: string;
  @Column({
    type: DataType.BOOLEAN,
  })
  is_active: boolean;
  @Column({
    type: DataType.STRING,
  })
  room: string;
  @Column({
    type: DataType.STRING,
  })
  password: string;
  @Column({
    type: DataType.STRING,
  })
  activation_link: string;
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @ApiProperty({ example: 1, description: "unikal ID - raqami" })
  @ForeignKey(() => Departmen)
  @Column({
    type: DataType.INTEGER,
  })
  departmentId: number;
  @BelongsTo(() => Departmen)
  departmen: Departmen;

  @HasMany(() => Appointment)
  appointment: Appointment[];
}
