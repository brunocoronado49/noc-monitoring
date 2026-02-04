import nodemailer from "nodemailer";
import { EmailService, SendMailOptions } from "./email-service";

describe("email-service.ts", () => {
  const mockSendMail = jest.fn();

  // Mock to createTransport
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail,
  });

  const emailService = new EmailService();

  test("Should send email", async () => {
    const options: SendMailOptions = {
      to: "francorangelcoronado@gmail.com",
      subject: "Test mail",
      htmlBody: "<h1>Hello World</h1>",
    };

    const emailSent = await emailService.sendEmail(options);

    expect(emailSent).toBe(true);
    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      to: "francorangelcoronado@gmail.com",
      subject: "Test mail",
      html: "<h1>Hello World</h1>",
    });
  });

  test("Should send email with attachments", async () => {
    await emailService.sendEmailWithFilesystemLogs(
      "francorangelcoronado@gmail.com",
    );

    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      to: "francorangelcoronado@gmail.com",
      subject: "Test mail",
      html: "<h1>Hello World</h1>",
    });
  });
});
