import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/env.plugins";

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

export interface Attachment {
  fileName: string;
  path: string;
}

export class EmailService {
  constructor() {}

  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments: attachments,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithFilesystemLogs(to: string | string[]): Promise<boolean> {
    const subject: string = "Logs del servidor";
    const htmlBody: string = `<h1>System Log</h1>`;
    const attachments: Attachment[] = [
      { fileName: "logs-all.log", path: "logs/logs-all.log" },
      { fileName: "logs-medium.log", path: "logs/logs-medium.log" },
      { fileName: "logs-high.log", path: "logs/logs-high.log" },
    ];

    return this.sendEmail({
      to,
      subject,
      attachments,
      htmlBody,
    });
  }
}
