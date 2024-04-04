import { IsString } from "class-validator";

export class CreatePatientDto {
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  @IsString()
  birth_day: string;
  @IsString()
  gender: string;
  @IsString()
  address: string;
  @IsString()
  phone_number: string;
  @IsString()
  email: string;
}
