import mongoose from 'mongoose';
import { MongoDatabase } from '../init';
import { envs } from '../../../config/plugins/env.plugins';
import { LogModel } from './log.model';

describe('log.model.ts', () => {
  beforeAll(async () => {
    await MongoDatabase.connect({
      mongoUrl: envs.MONGO_URL!,
      dbName: envs.MONGO_DB_NAME!,
    });
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  test('Should return LogModel', async () => {
    const logData = {
      origin: 'log.model.test.ts',
      message: 'Test message',
      level: 'low',
    };

    const log = await LogModel.create(logData);

    expect(log).toEqual(
      expect.objectContaining({
        ...logData,
        createdAt: expect.any(Date),
        id: expect.any(String),
      })
    );

    await LogModel.findByIdAndDelete(log.id);
  });

  test('Should return the schema object', () => {
    const schema = LogModel.schema.obj;

    expect(schema).toEqual(
      expect.objectContaining({
        level: {
          type: expect.any(Function),
          enum: ['low', 'medium', 'high'],
          default: 'low',
        },
        message: { type: expect.any(Function), required: true },
        createdAt: expect.any(Object),
        origin: { type: expect.any(Function) },
      })
    );
  });
});
