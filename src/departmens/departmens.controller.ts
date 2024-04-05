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
import { ApiTags } from "@nestjs/swagger";

@Controller("departmens")
export class DepartmensController {
  constructor(private readonly departmensService: DepartmensService) {}

  @ApiTags("create departmens")
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createDepartmenDto: CreateDepartmenDto) {
    return this.departmensService.create(createDepartmenDto);
  }

  @ApiTags("get all departmens")
  @Get()
  findAll() {
    return this.departmensService.findAll();
  }

  @ApiTags("get one departmen")
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.departmensService.findOne(+id);
  }

  @ApiTags("update departmen")
  @UseGuards(AdminGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateDepartmenDto: UpdateDepartmenDto
  ) {
    return this.departmensService.update(+id, updateDepartmenDto);
  }

  @ApiTags("delete departmen")
  @UseGuards(AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.departmensService.remove(+id);
  }
}
