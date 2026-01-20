import { LogSeverityLevel } from '../domain/entities/log.entity';
import { LogRepository } from '../domain/repository/log.repository';
import { CheckService } from '../domain/usecases/checks/check-service';
import { SendEmailLogs } from '../domain/usecases/logs/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasource/file-system.datasource';
import { MongoLogDatasource } from '../infrastructure/datasource/mongo-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repository/ log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email-service';

const logRepository: LogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log('Server started...');

    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   'francorangelcoronado@gmail.com',
    //   'franrangel265@gmail.com',
    // ]);

    // const logs = await logRepository.getLogs(LogSeverityLevel.low);
    // console.log(logs);

    // emailService.sendEmailWithFilesystemLogs([
    //   'francorangelcoronado@gmail.com',
    //   'franrangel265@gmail.com',
    // ]);

    // CronService.createJob('*/5 * * * * *', () => {
    //   const url: string = 'https://googlehgghhgccg.com';

    //   new CheckService(
    //     logRepository,
    //     () => console.log(`Success in url: ${url}`),
    //     (error: string) => console.log(error)
    //   ).execute(url);
    // });
  }
}
