import { Injectable } from '@nestjs/common';
import * as nodemailer from "nodemailer";
import { SendEmailDto } from './mailer.interface';
@Injectable()
export class MailerService {
    mailTransport(){
        // const transporter = nodemailer.createTransport({
        //     host: "sandbox.smtp.mailtrap.io",//this.configService.get<string>("MAIL_HOST"),
        //     port: 465,
        //     secure: false, // Use `true` for port 465, `false` for all other ports
        //     auth: {
        //       user: "943b9b15efb713",
        //       pass: "jn7jnAPss4f63QBp6D",
        //     },
        //   });
        const transporter = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 465,
          secure: true,
          auth: {
            user: "943b9b15efb713",
            pass: "********3adf"
          },
          tls: {
            ciphers:'SSLv3'
        }
        });

          return transporter;
    }

    template(html:string ,replaceMent:Record<string,string>){
        return html.replace(
            /% (\w*)%/g,
            function(m,key){
                return replaceMent.hasOwnProperty(key)? replaceMent[key]:"";
            }
        )
    }

    async sendMail(dto:SendEmailDto){
        const {from,recipent,subject} = dto;
const html = dto.placeholderReplacement ? this.template(dto.html,dto.placeholderReplacement):dto.html;
        const transport= this.mailTransport()
        const options ={
          from : from ??{
              name: "maddison53@ethereal.email", // default value(,)
              address: "jn7jnAPss4f63QBp6D",
            },
            to:recipent,
            subject,
            html
        }
        try {
          const result = await transport.sendMail(options)
          console.log("result",result);
          return result
        } catch (error) {
          console.log(error)
        }
    }
}
