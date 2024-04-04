import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateDoctorDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;
  @IsString()
  last_name: string;
  @IsString()
  specialization: string;
  @IsString()
  departmentID: number;
  @IsString()
  phone_number: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  address: string;
  @IsBoolean()
  is_active: boolean;
  @IsString()
  room: string;
  @IsString()
  password: string;
}
