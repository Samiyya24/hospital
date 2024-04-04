import { IsNumber, IsString } from "class-validator";

export class CreateAppointmentDto {
  @IsNumber()
  patient_id: number;
  @IsNumber()
  doctor_id: number;
  @IsNumber()
  date_visit: number;
  @IsString()
  diagnosis: string;
  @IsString()
  treatment_plan: string;
}
