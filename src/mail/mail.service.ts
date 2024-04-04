import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Admin } from '../admin/models/admin.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendMail(Admin: Admin) {
    const url = `${process.env.API_HOST}:${process.env.PORT}/api/admins/activate/${Admin.activation_link}`;
    console.log(url);
    await this.mailerService.sendMail({
      to: Admin.email,
      subject: 'Welcome to Hospital App! Comformation your email',
      template:'./confirmation',
      context:{
        name:Admin.first_name,
        url,
      }
    });
  }
}
