import { LogEntity, LogSeverityLevel } from './log.entity';

describe('log.entity.ts', () => {
  const data = {
    level: LogSeverityLevel.high,
    message: 'test entity',
    origin: 'log.entity.test.ts',
  };

  test('Should create a LogEntity instance', () => {
    const log = new LogEntity({
      level: LogSeverityLevel.high,
      message: 'test entity',
      origin: 'log.entity.test.ts',
    });

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(data.message);
    expect(log.level).toBe(data.level);
    expect(log.origin).toBe(data.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test('Should create a log entity instance fromJson', () => {
    const json: string = `{"level":"low","message":"Service https://google.com working...","createdAt":"2026-01-23T19:59:30.885Z","origin":"check-service.ts"}`;
    const log = LogEntity.fromJson(json);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe('Service https://google.com working...');
    expect(log.level).toBe('low');
    expect(log.origin).toBe('check-service.ts');
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test('Should create a LogEntity instance fromObject', () => {
    const log = LogEntity.fromObject(data);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(data.message);
    expect(log.level).toBe(data.level);
    expect(log.origin).toBe(data.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });
});
