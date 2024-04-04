import { PartialType } from '@nestjs/swagger';
import { CreateAppointmentDto } from './create-appointment.dto';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
  patient_id?: number;
  doctor_id?: number;
  date_visit?: number;
  diagnosis?: string;
  treatment_plan?: string;
}
