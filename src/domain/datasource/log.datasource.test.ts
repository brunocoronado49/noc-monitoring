import { LogEntity, LogSeverityLevel } from '../entities/log.entity';
import { LogDatasource } from './log.datasource';

describe('log.datasource.ts', () => {
  const newLog: LogEntity = new LogEntity({
    origin: 'log.datasource.test.ts',
    level: LogSeverityLevel.low,
    message: 'test-message',
  });

  class MockLogDatasource implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [newLog];
    }
  }

  test('Should test the abstract class', async () => {
    const mockLogDatasource: MockLogDatasource = new MockLogDatasource();

    expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
    expect(typeof mockLogDatasource.saveLog).toBe('function');
    expect(typeof mockLogDatasource.getLogs).toBe('function');

    await mockLogDatasource.saveLog(newLog);
    const logs: LogEntity[] = await mockLogDatasource.getLogs(LogSeverityLevel.high);

    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});
