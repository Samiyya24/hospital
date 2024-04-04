import { PartialType } from '@nestjs/swagger';
import { CreateAdminDto } from './create-admin.dto';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
    first_name?:string
    last_name?:string
    address?:string
    phone_number?:string
    email?:string
    password?:string
    worker_id?:number
}
