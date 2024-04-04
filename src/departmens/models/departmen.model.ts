import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

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
    example: "Sobir",
    description: "Foydalanuvchining logini",
  })
  @Column({
    type: DataType.STRING,
  })
  departmen_name: string;
}
