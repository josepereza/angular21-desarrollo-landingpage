import { DataSource } from 'typeorm';
import { getEnvironment } from '../config/env';
import { ClientEmailEntity } from '../entities/client-email.entity';
import { ClientEntity } from '../entities/client.entity';
import { ClientReportEntity } from '../entities/client-report.entity';

let dataSource: DataSource | null = null;

export async function getAppDataSource(): Promise<DataSource> {
  if (dataSource?.isInitialized) {
    return dataSource;
  }

  const env = getEnvironment();

  dataSource = new DataSource({
    type: 'postgres',
    url: env.databaseUrl,
    entities: [ClientEntity, ClientReportEntity, ClientEmailEntity],
    synchronize: false,
    logging: false,
    ssl: shouldUseSsl(env.databaseUrl)
      ? {
          rejectUnauthorized: false,
        }
      : false,
  });

  return dataSource.initialize();
}

function shouldUseSsl(databaseUrl: string): boolean {
  return /sslmode=require/i.test(databaseUrl) || databaseUrl.includes('amazonaws.com');
}
