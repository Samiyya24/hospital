import { PartialType } from '@nestjs/swagger';
import { CreateDoctorDto } from './create-doctor.dto';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
  first_name?: string;
  last_name?: string;
  specialization?: string;
  departmentID?: number;
  phone_number?: string;
  email?: string;
  address?: string;
  is_active?: boolean;
  room?: string;
  password?: string;
}
