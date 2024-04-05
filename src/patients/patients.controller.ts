import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Patient } from './models/patient.model';
import { Response } from 'express';

@Controller("patients")
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  // ----------------------REGISTRATION------------------------------------

  @ApiOperation({ summary: "register admin" })
  @ApiResponse({ status: 201, type: Patient })
  @Post("signUp")
  async registration(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.registration(createAdminDto, res);
  }

  // ---------------LOGIN-------------------------
  @HttpCode(200)
  @Post("login")
  async login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.patientsService.login(loginAdminDto, res);
  }
  // --------------LOGOUT-----------------------
  @HttpCode(200)
  @Post("logout")
  async logout(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.logout(refreshToken, res);
  }
  // ----------------------ACTIVATE------------------------------------
  @Get("activate/:link")
  async activate(@Param("link") link: string) {
    return this.adminService.activate(link);
  }

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.patientsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.patientsService.remove(+id);
  }
}
