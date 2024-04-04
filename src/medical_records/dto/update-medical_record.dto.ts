import { PartialType } from '@nestjs/swagger';
import { CreateMedicalRecordDto } from './create-medical_record.dto';

export class UpdateMedicalRecordDto extends PartialType(CreateMedicalRecordDto) {
  patient_id?: number;
  doctor_id?: number;
  date_visit?: number;
  diagnosis?: string;
  treatment_plan?: string;
}
