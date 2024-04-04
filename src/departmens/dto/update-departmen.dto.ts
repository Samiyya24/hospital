import { PartialType } from '@nestjs/swagger';
import { CreateDepartmenDto } from './create-departmen.dto';

export class UpdateDepartmenDto extends PartialType(CreateDepartmenDto) {
  departmen_name: string;
}
