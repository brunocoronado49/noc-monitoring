import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req: Response = await fetch(url);

      if (!req.ok) {
        throw new Error(`Error on check service: ${url}`);
      }

      const log: LogEntity = new LogEntity(LogSeverityLevel.low, `Service ${url} working...`);
      this.logRepository.saveLog(log);
      this.successCallback && this.successCallback();

      return true;
    } catch (error) {
      const errorMessage: string = `${url} - ${error}`;
      const log: LogEntity = new LogEntity(LogSeverityLevel.high, errorMessage);
      this.logRepository.saveLog(log);
      this.errorCallback && this.errorCallback(errorMessage);

      return false;
    }
  }
}
