import { IsNotEmpty, IsString } from "class-validator";

export class CreateAdminDto {
  first_name: string;
  last_name: string;
  address: string;
  phone_number: string;
  email: string;
  password: string;
  worker_id: number;
  @IsString()
  @IsNotEmpty()
  confirm_password: string;
}
