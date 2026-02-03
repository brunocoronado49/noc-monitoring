import { envs } from './env.plugins';

describe('env.plugins.ts', () => {
  test('Should return env options', () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'francorangelcoronado@gmail.com',
      MAILER_SECRET_KEY: 'sblwoyuknwdmnuve',
      MONGO_URL: 'mongodb://francisco:123456789@localhost:27017/',
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_USER: 'francisco',
      MONGO_PASS: '123456789',
      POSTGRES_URL: 'postgresql://postgres:123456789@localhost:5432/NOC',
    });
  });

  test('Should return error if not found env', async () => {
    jest.resetModules();
    process.env.PORT = 'ABC';

    try {
      await import('./env.plugins');

      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
