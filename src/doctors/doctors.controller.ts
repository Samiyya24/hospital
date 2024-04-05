import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, Res } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { UserGuard } from 'src/guards/auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CookieGetter } from '../decorators/cookie_getter.decorator';
import { LoginDoctorDto } from './dto/login-doctor.dto';
import { Doctor } from './models/doctor.model';
import { Response } from 'express';

@Controller("doctors")
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  // ----------------------REGISTRATION------------------------------------

  @ApiOperation({ summary: "register doctor" })
  @ApiResponse({ status: 201, type: Doctor })
  @Post("signUp")
  async registration(
    @Body() createdoctorDto: CreateDoctorDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.doctorsService.registration(createdoctorDto, res);
  }

  // ---------------LOGIN-------------------------
  @HttpCode(200)
  @Post("login")
  async login(
    @Body() logindoctorDto: LoginDoctorDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.doctorsService.login(logindoctorDto, res);
  }
  // --------------LOGOUT-----------------------
  @HttpCode(200)
  @Post("logout")
  async logout(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.doctorsService.logout(refreshToken, res);
  }
  // ----------------------ACTIVATE------------------------------------
  @Get("activate/:link")
  async activate(@Param("link") link: string) {
    return this.doctorsService.activate(link);
  }

  @Post()
  @UseGuards(UserGuard)
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Get()
  @UseGuards(UserGuard)
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get(":id")
  @UseGuards(UserGuard)
  findOne(@Param("id") id: string) {
    return this.doctorsService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(UserGuard)
  update(@Param("id") id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(+id, updateDoctorDto);
  }

  @Delete(":id")
  @UseGuards(UserGuard)
  remove(@Param("id") id: string) {
    return this.doctorsService.remove(+id);
  }
}
