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
import { AppointmentsService } from "./appointments.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { AdminGuard } from "../guards/admin.guard";
import { ApiTags } from "@nestjs/swagger";
import { DoctorGuard } from "../guards/doctor.guard";

@Controller("appointments")
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @ApiTags("Create admin")
  @UseGuards(DoctorGuard)
  @UseGuards(AdminGuard)
  @UseGuards()
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @ApiTags("Get all Appointments")
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @ApiTags("FindOne Appointment")
  @UseGuards(AdminGuard)
  @UseGuards(DoctorGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @ApiTags("Update appointments")
  @UseGuards(AdminGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto
  ) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @ApiTags("Delete appointments")
  @UseGuards(AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.appointmentsService.remove(+id);
  }
}
