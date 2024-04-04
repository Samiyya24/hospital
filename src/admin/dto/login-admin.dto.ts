import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginAdminDto {
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
