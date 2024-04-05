import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { MedicalRecordsService } from "./medical_records.service";
import { CreateMedicalRecordDto } from "./dto/create-medical_record.dto";
import { UpdateMedicalRecordDto } from "./dto/update-medical_record.dto";
import { UserGuard } from "../guards/auth.guard";
import { AdminGuard } from "../guards/admin.guard";
import { DoctorGuard } from "../guards/doctor.guard";

@Controller("medical_records")
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

  @Post()
  @UseGuards(DoctorGuard)
  create(@Body() createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.medicalRecordsService.create(createMedicalRecordDto);
  }

  @UseGuards(DoctorGuard)
  @UseGuards(UserGuard)
  @Get()
  findAll() {
    return this.medicalRecordsService.findAll();
  }

  @UseGuards(AdminGuard)
  @UseGuards(DoctorGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.medicalRecordsService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @UseGuards(DoctorGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateMedicalRecordDto: UpdateMedicalRecordDto
    ) {
      return this.medicalRecordsService.update(+id, updateMedicalRecordDto);
    }
    
    @UseGuards(AdminGuard)
    @UseGuards(DoctorGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.medicalRecordsService.remove(+id);
  }
}
