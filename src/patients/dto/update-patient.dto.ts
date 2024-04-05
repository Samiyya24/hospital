import { PartialType } from '@nestjs/swagger';
import { CreatePatientDto } from './create-patient.dto';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  first_name?: string;
  last_name?: string;
  birth_day?: string;
  gender?: string;
  address?: string;
  phone_number?: string;
  email?: string;
  password?: string;
}
