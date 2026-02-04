import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepositoryImpl } from './ log.repository.impl';

describe('log.repository.impl.ts', () => {
  const mockLogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const logRepository = new LogRepositoryImpl(mockLogDatasource);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('saveLog should call the datasource with args', async () => {
    const log = {
      level: LogSeverityLevel.high,
      message: 'hello',
      origin: 'log.repository.impl.test.ts',
    } as LogEntity;

    await logRepository.saveLog(log);

    expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log);
  });

  test('getLogs should call the datasource with args', async () => {
    await logRepository.getLogs(LogSeverityLevel.low);

    expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low);
  });
});
