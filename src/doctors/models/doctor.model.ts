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

  @ApiProperty({
    example: "Sobirov",
    description: "Foydalanuvchining familyasi",
  })
  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @ApiProperty({
    example: "specialization",
    description: "Foydalanuvchining specialization",
  })
  @Column({
    type: DataType.STRING,
  })
  specialization: string;

  @ApiProperty({
    example: 1,
    description: "Foydalanuvchining departmentID",
  })
  @Column({
    type: DataType.INTEGER,
  })
  departmentID: number;

  @ApiProperty({
    example: "0987654321",
    description: "Foydalanuvchining phone_number",
  })
  @Column({
    type: DataType.STRING,
  })
  phone_number: string;

  @ApiProperty({
    example: "<EMAIL>",
    description: "Foydalanuvchining email",
  })
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @ApiProperty({
    example: "address",
    description: "Foydalanuvchining address",
  })
  @Column({
    type: DataType.STRING,
  })
  address: string;

  @ApiProperty({
    example: true,
    description: "Foydalanuvchining is_active",
  })
  @Column({
    type: DataType.BOOLEAN,
  })
  is_active: boolean;

  @ApiProperty({
    example: "5",
    description: "Foydalanuvchining xxonasi",
  })
  @Column({
    type: DataType.STRING,
  })
  room: string;

  @ApiProperty({
    example: "password",
    description: "Foydalanuvchining password",
  })
  @Column({
    type: DataType.STRING,
  })
  password: string;

  @ApiProperty({
    example: "activation_link",
    description: "Foydalanuvchining activation_link",
  })
  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  @ApiProperty({
    example: "hashed_refresh_token",
    description: "Foydalanuvchining hashed_refresh_token",
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @ApiProperty({
    example: "hashed_password",
    description: "Foydalanuvchining hashed_password",
  })
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
