import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
@Injectable()
export class EmailService {
  transporter: any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'oleg14ua71@gmail.com',
        pass: 88488848
      }
    });
  }

  async sendActivationMail(to: string, link: string) {

    await this.transporter.sendMail({
      from: 'oleg14ua71@gmail.com',
      to: to,
      subject: 'Активация аккаунта на ' + 'http://localhost:5000',
      text: '',
      html:
        `
            <div>
            <h1>Для активации перейдите по ссылке</h1>
            <a href="${link}">{link}</a>
            </div>
            `
    })
  }

}
