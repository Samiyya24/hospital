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
import { DepartmensService } from "./departmens.service";
import { CreateDepartmenDto } from "./dto/create-departmen.dto";
import { UpdateDepartmenDto } from "./dto/update-departmen.dto";
import { UserGuard } from "../guards/auth.guard";
import { AdminGuard } from "../guards/admin.guard";

@Controller("departmens")
export class DepartmensController {
  constructor(private readonly departmensService: DepartmensService) {}

  @Post()
  create(@Body() createDepartmenDto: CreateDepartmenDto) {
    return this.departmensService.create(createDepartmenDto);
  }

  // @UseGuards(UserGuard)
  @Get()
  findAll() {
    return this.departmensService.findAll();
  }

  @UseGuards(UserGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.departmensService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateDepartmenDto: UpdateDepartmenDto
  ) {
    return this.departmensService.update(+id, updateDepartmenDto);
  }

  @UseGuards(AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.departmensService.remove(+id);
  }
}
