import { IsNumber, IsString } from "class-validator";

export class CreateMedicalRecordDto {
  @IsNumber()
  patient_id: number;
  @IsNumber()
  doctor_id: number;
  @IsString()
  date_visit: string;
  @IsString()
  diagnosis: string;
  @IsString()
  treatment_plan: string;
}
