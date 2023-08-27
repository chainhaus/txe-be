import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendForgotPassword(email: string, fullname: string, token: string) {
    console.log(process.env.SITE_URL);
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      from: '"Support Team" <support@gmail.com>',
      subject: 'Your reset password',
      template: './forgot-password',
      context: {
        name: fullname,
        url,
      },
    });
  }
}
