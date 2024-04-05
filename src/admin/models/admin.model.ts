import { ApiProperty } from "@nestjs/swagger"
import { Column, DataType, Model, Table } from "sequelize-typescript"
import { boolean } from "yargs";

interface IAdminCreateAttr {
  first_name: string;
  last_name: string;
  address: string;
  phone_number: string;
  email: string;
  password: string;
  worker_id: number;
  hashed_password: string;
  is_active:boolean
}

@Table({ tableName: "admin" })
export class Admin extends Model<Admin, IAdminCreateAttr> {
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
    example: "Toshkent",
    description: "Foydalanuvchining addresi",
  })
  @Column({
    type: DataType.STRING,
  })
  address: string;

  @ApiProperty({
    example: "0987654321",
    description: "Foydalanuvchining telefon raqami",
  })
  @Column({
    type: DataType.STRING,
  })
  phone_number: string;

  @ApiProperty({
    example: "<EMAIL>",
    description: "Foydalanuvchining email raqami",
  })
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @ApiProperty({
    example: "<PASSWORD>",
    description: "Foydalanuvchining hashed_password raqami",
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @ApiProperty({
    example: 1,
    description: "Foydalanuvchining  password",
  })
  @Column({
    type: DataType.STRING,
  })
  password: string;

  @ApiProperty({
    example: 1,
    description: "worker ID - raqami",
  })
  @Column({
    type: DataType.INTEGER,
  })
  worker_id: number;

  @ApiProperty({
    example: boolean,
    description: "is_creater",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_creater: boolean;

  @ApiProperty({
    example: boolean,
    description: "is_active",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: 123,
    description: "hashed_refresh_token",
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @ApiProperty({
    example: 123,
    description: "activation_link",
  })
  @Column({
    type: DataType.STRING,
  })
  activation_link: string;
}
