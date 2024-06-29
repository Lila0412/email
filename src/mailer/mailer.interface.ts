import {Address} from "nodemailer/lib/mailer";
export type SendEmailDto ={
    from ?: Address,
    recipent:Address[],
    subject:string;
    html:string;
    text ?: string;
    placeholderReplacement?:Record<string,string>;
}