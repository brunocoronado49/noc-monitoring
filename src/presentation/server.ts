import { CheckService } from '../domain/usecases/checks/check-service';
import { CronService } from './cron/cron-service';

export class Server {
  public static start() {
    console.log('Server started...');

    CronService.createJob('*/5 * * * * *', () => {
      const url: string = 'https://google.com';

      new CheckService(
        () => console.log(`Success in url: ${url}`),
        (error: string) => console.log(error)
      ).execute(url);
    });
  }
}
