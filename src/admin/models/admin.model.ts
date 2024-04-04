import { ApiProperty } from "@nestjs/swagger"
import { Column, DataType, Model, Table } from "sequelize-typescript"

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
    description: "Foydalanuvchining logini",
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
    type: DataType.STRING,
  })
  password: string;
  @Column({
    type: DataType.INTEGER,
  })
  worker_id: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_owner: boolean;
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
}
