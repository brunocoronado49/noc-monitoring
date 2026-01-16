import { LogRepository } from '../domain/repository/log.repository';
import { CheckService } from '../domain/usecases/checks/check-service';
import { FileSystemDatasource } from '../infrastructure/datasource/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repository/ log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email-service';

const fileSystemLogRepository: LogRepository = new LogRepositoryImpl(new FileSystemDatasource());

export class Server {
  public static start() {
    console.log('Server started...');

    // TODO: send email
    const emailService = new EmailService();
    emailService.sendEmail({
      to: 'francorangelcoronado@gmail.com',
      subject: 'MAILER TEST (System logs)',
      htmlBody: `<h1>System Log</h1>`,
    });

    // CronService.createJob('*/5 * * * * *', () => {
    //   const url: string = 'https://google.com';

    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`Success in url: ${url}`),
    //     (error: string) => console.log(error)
    //   ).execute(url);
    // });
  }
}
