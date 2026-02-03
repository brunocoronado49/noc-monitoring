import mongoose from 'mongoose';
import { MongoDatabase } from './init';

describe('init.ts', () => {
  afterAll(() => {
    mongoose.connection.close();
  });

  test('Should connect to Mongodb', async () => {
    const connected = await MongoDatabase.connect({
      dbName: process.env.MONGO_DB_NAME!,
      mongoUrl: process.env.MONGO_URL!,
    });

    expect(connected).toBe(true);
  });

  test('Should throw an error', async () => {
    try {
      const connected = await MongoDatabase.connect({
        dbName: process.env.MONGO_DB_NAME!,
        mongoUrl: 'mongodb://francisco:123456789@localhost123:27017/',
      });

      expect(true).toBe(false);
    } catch (error) {}
  });
});
