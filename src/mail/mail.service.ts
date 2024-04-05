import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Admin } from '../admin/models/admin.model';
import { Doctor } from '../doctors/models/doctor.model';
import { Patient } from '../patients/models/patient.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendMail(admin: Admin) {
    const url = `${process.env.API_HOST}:${process.env.PORT}/api/admins/activate/${admin.activation_link}`;
    console.log(url);
    await this.mailerService.sendMail({
      to: admin.email,
      subject: "Welcome to Hospital App! Comformation your email",
      template: "./confirmation",
      context: {
        name: admin.first_name,
        url,
      },
    });
  }
  async sendMailDoctor(doctor: Doctor) {
    const url = `${process.env.API_HOST}:${process.env.PORT}/api/doctor/activate/${doctor.activation_link}`;
    console.log(url);
    await this.mailerService.sendMail({
      to: doctor.email,
      subject: "Welcome to Hospital App! Comformation your email",
      template: "./confirmation",
      context: {
        name: doctor.first_name,
        url,
      },
    });
  }

  async sendMailPatient(patient: Patient) {
    const url = `${process.env.API_HOST}:${process.env.PORT}/api/patient/activate/${patient.activation_link}`;
    console.log(url);
    await this.mailerService.sendMail({
      to: patient.email,
      subject: "Welcome to Hospital App! Comformation your email",
      template: "./confirmation",
      context: {
        name: patient.first_name,
        url,
      },
    });
  }
}
