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
import { PatientsService } from "./patients.service";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { AdminGuard } from "../guards/admin.guard";
import { DoctorGuard } from "../guards/doctor.guard";

@Controller("patients")
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @UseGuards(AdminGuard)
  @UseGuards(DoctorGuard)
  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @UseGuards(AdminGuard)
  @UseGuards(DoctorGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.patientsService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @UseGuards(AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.patientsService.remove(+id);
  }
}
