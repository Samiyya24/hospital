import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Patient } from "../../patients/models/patient.model";

interface IMedicalRecordCreateAttr {
  patient_id: number;
  doctor_id: number;
  date_visit: string;
  diagnosis: string;
  treatment_plan: string;
}
@Table({ tableName: "medical_recorder" })
export class MedicalRecord extends Model<
  MedicalRecord,
  IMedicalRecordCreateAttr
> {
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
  doctor_id: number;
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
  Patient: Patient;
}
