import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Admin } from "./models/admin.model";
import { Response } from "express";
import { LoginAdminDto } from "./dto/login-admin.dto";
import { CookieGetter } from "../decorators/cookie_getter.decorator";
import { UserGuard } from "../guards/auth.guard";
import { AdminGuard } from "../guards/admin.guard";
import { CreatorGuards } from "../guards/creator.guard";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // ----------------------REGISTRATION------------------------------------
  @UseGuards(CreatorGuards)
  @ApiOperation({ summary: "register admin" })
  @ApiResponse({ status: 201, type: Admin })
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
    return this.adminService.login(loginAdminDto, res);
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

  @Post()
  @UseGuards(UserGuard)
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  // ----------------------ACTIVATE------------------------------------
  @Get("activate/:link")
  async activate(@Param("link") link: string) {
    return this.adminService.activate(link);
  }

  // ----------------------FINDALL------------------------------------
  @UseGuards(UserGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(UserGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @UseGuards(AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }
}
