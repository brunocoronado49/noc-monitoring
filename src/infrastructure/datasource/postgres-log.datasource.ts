import { PrismaPg } from '@prisma/adapter-pg';
import { envs } from '../../config/plugins/env.plugins';
import { LogDatasource } from '../../domain/datasource/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { PrismaClient, SeverityLevel } from '../../generated/prisma/client';

const connectionString: string = envs.POSTGRES_URL;
const adapter: PrismaPg = new PrismaPg({ connectionString });
const prismaClient: PrismaClient = new PrismaClient({ adapter });

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgresLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const level = severityEnum[log.level];

    await prismaClient.logModel.create({
      data: {
        ...log,
        level,
      },
    });

    console.log('Log saved in PostgreSQL');
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = severityEnum[severityLevel];

    const dbLogs = await prismaClient.logModel.findMany({
      where: { level },
    });

    return dbLogs.map(dblog => LogEntity.fromObject(dblog));
  }
}
