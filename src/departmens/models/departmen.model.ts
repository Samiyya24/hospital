import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Doctor } from "../../doctors/models/doctor.model";

interface IDepartmentCreateAttr {
  departmen_name: string;
}
@Table({ tableName: "departmens" })
export class Departmen extends Model<Departmen, IDepartmentCreateAttr> {
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
    example: "department name",
    description: "Foydalanuvchining departmen_name",
  })
  @Column({
    type: DataType.STRING,
  })
  departmen_name: string;

  @HasMany(() => Doctor)
  appointment: Doctor[];
}
