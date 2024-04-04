import { IsString } from "class-validator";

export class CreateDepartmenDto {
    @IsString()
    departmen_name:string
}
