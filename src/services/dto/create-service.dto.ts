import { IsString } from "class-validator";

export class CreateServiceDto {
  @IsString()
  service_name: string;
  @IsString()
  description: string;
  @IsString()
  price: string;
}
