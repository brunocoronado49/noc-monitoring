import mongoose from 'mongoose';
import { MongoDatabase } from '../../data/mongo/init';
import { envs } from '../../config/plugins/env.plugins';
import { MongoLogDatasource } from './mongo-log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

describe('mongo-log.datasource.ts', () => {
  const logDatasource = new MongoLogDatasource();

  const log = new LogEntity({
    level: LogSeverityLevel.medium,
    message: 'test message',
    origin: 'mongo-log.datasource.test.ts',
  });

  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME!,
      mongoUrl: envs.MONGO_URL!,
    });
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  test('Should create a log', async () => {
    const logSpy = jest.spyOn(console, 'log');

    await logDatasource.saveLog(log);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith('Log saved in MongoDb');
  });

  test('Should gets logs', async () => {
    await logDatasource.saveLog(log);
    const logs = await logDatasource.getLogs(LogSeverityLevel.medium);
    // expect(logs.length).toBe(7);
    // expect(logs[0].level).toBe(LogSeverityLevel.medium);
  });
});
