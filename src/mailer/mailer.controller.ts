import { Controller, Body,Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './mailer.interface';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}
  @Post()
  async sendMail(@Body() body:Record<string,string>){
    const dto:SendEmailDto={
      from: "testing@gmail.com",
      recipent: [{ name: "john", address: "lilamod6574@gmail.com" }],
      subject: "testing",
      html: '<P>Testing %name % </p>',
      placeholderReplacement: body
    }
    return await this.mailerService.sendMail(dto)
  }
}
