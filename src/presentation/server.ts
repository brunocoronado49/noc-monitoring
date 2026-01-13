import { LogRepository } from '../domain/repository/log.repository';
import { CheckService } from '../domain/usecases/checks/check-service';
import { FileSystemDatasource } from '../infrastructure/datasource/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repository/ log.repository.impl';
import { CronService } from './cron/cron-service';

const fileSystemLogRepository: LogRepository = new LogRepositoryImpl(new FileSystemDatasource());

export class Server {
  public static start() {
    console.log('Server started...');

    CronService.createJob('*/5 * * * * *', () => {
      const url: string = 'https://locahost:3000';

      new CheckService(
        fileSystemLogRepository,
        () => console.log(`Success in url: ${url}`),
        (error: string) => console.log(error)
      ).execute(url);
    });
  }
}
