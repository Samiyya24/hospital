import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from "class-validator";

export class FindUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  first_name?: string;

  @IsOptional()
  @IsPhoneNumber("UZ")
  phone_number?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

//   @IsOptional()
//   @IsString()
//   tg_link?: string;
}

// @IsDateString()
// 2020.01.01
