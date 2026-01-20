import { LogRepository } from '../domain/repository/log.repository';
import { CheckServiceMultiple } from '../domain/usecases/checks/check-service-multiple';
import { SendEmailLogs } from '../domain/usecases/logs/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasource/file-system.datasource';
import { MongoLogDatasource } from '../infrastructure/datasource/mongo-log.datasource';
import { PostgresLogDatasource } from '../infrastructure/datasource/postgres-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repository/ log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email-service';

const fsLogRepository: LogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const mongoLogRepository: LogRepository = new LogRepositoryImpl(new MongoLogDatasource());
const PostgresLogDatasourceLogRepository: LogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
);

const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log('Server started...');

    new SendEmailLogs(emailService, fsLogRepository).execute([
      'francorangelcoronado@gmail.com',
      'franrangel265@gmail.com',
    ]);

    emailService.sendEmailWithFilesystemLogs([
      'francorangelcoronado@gmail.com',
      'franrangel265@gmail.com',
    ]);

    CronService.createJob('*/5 * * * * *', () => {
      const url: string = 'https://google.com';

      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, PostgresLogDatasourceLogRepository],
        () => console.log(`Success in url: ${url}`),
        (error: string) => console.log(error)
      ).execute(url);
    });
  }
}
