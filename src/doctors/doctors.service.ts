import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Doctor } from "./models/doctor.model";
import { JwtService } from "@nestjs/jwt";
import { MailService } from "../mail/mail.service";
import * as bcrypt from "bcrypt";
import { v4 } from "uuid";
import { LoginDoctorDto } from "./dto/login-doctor.dto";
import { Response } from "express";

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor) private doctorRepo: typeof Doctor,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  async getTokens(doctor: Doctor) {
    const payload = {
      id: doctor.id,
      is_active: doctor.is_active,
    };
    const [accsessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accsessToken,
      refreshToken: refreshToken,
    };
  }

  async registration(createDoctorDto: CreateDoctorDto, res: Response) {
    const doctor = await this.doctorRepo.findOne({
      where: { email: createDoctorDto.email },
    });
    if (doctor) {
      throw new BadRequestException("Bunday foydalanuvchi mavjud");
    }
    if (createDoctorDto.password !== createDoctorDto.confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(createDoctorDto.password, 7);
    const newDoctor = await this.doctorRepo.create({
      ...createDoctorDto,
      hashed_password,
    });
    const tokens = await this.getTokens(newDoctor);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    const activation_link = v4();
    const updatedDoctor = await this.doctorRepo.update(
      { hashed_refresh_token, activation_link },
      {
        where: { id: newDoctor.id },
        returning: true,
      }
    );
    res.cookie("refresh_token", tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const updateDoctor = updatedDoctor[1][0];

    try {
      await this.mailService.sendMailDoctor(updateDoctor);
    } catch (error) {
      throw new BadRequestException("Xatni yuborishda xatolik");
    }
    const response = {
      message: "doctor registered",
      doctor: updateDoctor,
      tokens,
    };
    return response;
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }
    const updatedDoctor = await this.doctorRepo.update(
      { is_active: true },
      {
        where: { activation_link: link, is_active: false },
        returning: true,
      }
    );
    if (!updatedDoctor[1][0]) {
      throw new BadRequestException("doctor already activated");
    }
    const response = {
      message: "doctor activated successfully",
      doctor: updatedDoctor[1][0].is_active,
    };
    return response;
  }

  async login(loginDoctorDto: LoginDoctorDto, res: Response) {
    const { email, password } = loginDoctorDto;
    const doctor = await this.doctorRepo.findOne({ where: { email } });
    if (!doctor) {
      throw new BadRequestException("doctor not found");
    }
    if (!doctor.is_active) {
      throw new BadRequestException("doctor  is not activate");
    }
    const isMatchPass = await bcrypt.compare(password, doctor.hashed_password);
    if (!isMatchPass) {
      throw new BadRequestException("Password do not match");
    }

    const tokens = await this.getTokens(doctor);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    const updatedDoctor = await this.doctorRepo.update(
      { hashed_refresh_token },
      {
        where: { id: doctor.id },
        returning: true,
      }
    );
    res.cookie("refresh_token", tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: "doctor logged in",
      doctor: updatedDoctor[1][0],
      tokens,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const DoctorDate = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!DoctorDate) {
      throw new ForbiddenException("doctor not verified");
    }
    const updatedDoctor = await this.doctorRepo.update(
      { hashed_refresh_token: null },
      {
        where: { id: DoctorDate.id },
        returning: true,
      }
    );
    res.clearCookie("refresh_token");
    const response = {
      message: "doctor logged out successfully",
      Doctor_refresh_token: updatedDoctor[1][0].hashed_refresh_token,
    };
    return response;
  }

  async refreshToken(DoctorId: number, refreshToken: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refreshToken);
    if (DoctorId !== decodedToken["id"]) {
      throw new BadRequestException("Ruxsat etilmagan");
    }
    const doctor = await this.doctorRepo.findOne({ where: { id: DoctorId } });
    if (!doctor || !doctor.hashed_refresh_token) {
      throw new BadRequestException("doctor not found");
    }
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      doctor.hashed_refresh_token
    );
    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }
    const tokens = await this.getTokens(doctor);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    const updatedDoctor = await this.doctorRepo.update(
      { hashed_refresh_token },
      {
        where: { id: doctor.id },
        returning: true,
      }
    );
    res.cookie("refresh_token", tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: "doctor refreshed ",
      doctor: updatedDoctor[1][0],
      tokens,
    };
    return response;
  }

  create(createDoctorDto: CreateDoctorDto) {
    return this.doctorRepo.create(createDoctorDto);
  }

  findAll() {
    return this.doctorRepo.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.doctorRepo.findByPk(id);
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return this.doctorRepo.update(updateDoctorDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.doctorRepo.destroy({ where: { id } });
  }
}
