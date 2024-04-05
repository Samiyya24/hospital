import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Patient } from './models/patient.model';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { Response } from "express";
import * as bcrypt from "bcrypt";
import { v4 } from "uuid";
import { LoginPatientDto } from './dto/login-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient) private patientRepo: typeof Patient,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  async getTokens(patient: Patient) {
    const payload = {
      id: patient.id,
      is_active: patient.is_active,
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

  async registration(createPatientDto: CreatePatientDto, res: Response) {
    const patient = await this.patientRepo.findOne({
      where: { email: createPatientDto.email },
    });
    if (patient) {
      throw new BadRequestException("Bunday foydalanuvchi mavjud");
    }
    if (createPatientDto.password !== createPatientDto.confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(createPatientDto.password, 7);
    const newPatient = await this.patientRepo.create({
      ...createPatientDto,
      hashed_password,
    });
    const tokens = await this.getTokens(newPatient);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    const activation_link = v4();
    const updatedPatient = await this.patientRepo.update(
      { hashed_refresh_token, activation_link },
      {
        where: { id: newPatient.id },
        returning: true,
      }
    );
    res.cookie("refresh_token", tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const updatePatient = updatedPatient[1][0];

    try {
      await this.mailService.sendMailPatient(updatePatient);
    } catch (error) {
      throw new BadRequestException("Xatni yuborishda xatolik");
    }
    const response = {
      message: "patient registered",
      patient: updatePatient,
      tokens,
    };
    return response;
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }
    const updatedPatient = await this.patientRepo.update(
      { is_active: true },
      {
        where: { activation_link: link, is_active: false },
        returning: true,
      }
    );
    if (!updatedPatient[1][0]) {
      throw new BadRequestException("patient already activated");
    }
    const response = {
      message: "patient activated successfully",
      patient: updatedPatient[1][0].is_active,
    };
    return response;
  }

  async login(loginPatientDto: LoginPatientDto, res: Response) {
    const { email, password } = loginPatientDto;
    const patient = await this.patientRepo.findOne({ where: { email } });
    if (!patient) {
      throw new BadRequestException("patient not found");
    }
    if (!patient.is_active) {
      throw new BadRequestException("patient  is not activate");
    }
    const isMatchPass = await bcrypt.compare(password, patient.hashed_password);
    if (!isMatchPass) {
      throw new BadRequestException("Password do not match");
    }

    const tokens = await this.getTokens(patient);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    const updatedPatient = await this.patientRepo.update(
      { hashed_refresh_token },
      {
        where: { id: patient.id },
        returning: true,
      }
    );
    res.cookie("refresh_token", tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: "patient logged in",
      patient: updatedPatient[1][0],
      tokens,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const PatientDate = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!PatientDate) {
      throw new ForbiddenException("patient not verified");
    }
    const updatedPatient = await this.patientRepo.update(
      { hashed_refresh_token: null },
      {
        where: { id: PatientDate.id },
        returning: true,
      }
    );
    res.clearCookie("refresh_token");
    const response = {
      message: "patient logged out successfully",
      Patient_refresh_token: updatedPatient[1][0].hashed_refresh_token,
    };
    return response;
  }

  async refreshToken(PatientId: number, refreshToken: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refreshToken);
    if (PatientId !== decodedToken["id"]) {
      throw new BadRequestException("Ruxsat etilmagan");
    }
    const patient = await this.patientRepo.findOne({ where: { id: PatientId } });
    if (!patient || !patient.hashed_refresh_token) {
      throw new BadRequestException("patient not found");
    }
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      patient.hashed_refresh_token
    );
    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }
    const tokens = await this.getTokens(patient);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    const updatedPatient = await this.patientRepo.update(
      { hashed_refresh_token },
      {
        where: { id: patient.id },
        returning: true,
      }
    );
    res.cookie("refresh_token", tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: "patient refreshed ",
      patient: updatedPatient[1][0],
      tokens,
    };
    return response;
  }

  create(createPatientDto: CreatePatientDto) {
    return this.patientRepo.create(createPatientDto);
  }

  findAll() {
    return this.patientRepo.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.patientRepo.findByPk(id);
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return this.patientRepo.update(updatePatientDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.patientRepo.destroy({ where: { id } });
  }
}
