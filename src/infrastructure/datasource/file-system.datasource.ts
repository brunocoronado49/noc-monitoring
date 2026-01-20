import fs from 'fs';
import { LogDatasource } from '../../domain/datasource/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath: string = 'logs/';
  private readonly allLogsPath: string = 'logs/logs-all.log';
  private readonly mediumLogsPath: string = 'logs/logs-medium.log';
  private readonly highLogsPath: string = 'logs/logs-high.log';

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(path => {
      if (fs.existsSync(path)) return;
      fs.writeFileSync(path, '');
    });
  };

  async saveLog(log: LogEntity): Promise<void> {
    const logAsJson: string = `${JSON.stringify(log)}\n`;

    fs.appendFileSync(this.allLogsPath, logAsJson);

    if (log.level === LogSeverityLevel.low) return;

    if (log.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logAsJson);
    } else {
      fs.appendFileSync(this.highLogsPath, logAsJson);
    }
  }

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content: string = fs.readFileSync(path, 'utf-8');
    if (content === '') return [];

    const logs = content.split('\n').map(LogEntity.fromJson);
    // const logs = content.split('\n').map(log => {
    //   return LogEntity.fromJson(log);
    // });

    return logs;
  };

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogsPath);
      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath);
      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogsPath);
      default:
        throw new Error(`${severityLevel} not implemented`);
    }
  }
}
