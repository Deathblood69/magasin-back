import { Logger } from '@nestjs/common';
import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';
import { DATABASE_CONFIG } from './common/config/database.config';

const logger = new Logger('MikroORM');
const config = {
  entities: ['dist/**/user/entities/user.entity.js', 'dist/**/entities/*.js'],
  entitiesTs: ['src/**/entities/*.ts'],
  host: DATABASE_CONFIG.host,
  dbName: DATABASE_CONFIG.name,
  user: DATABASE_CONFIG.user,
  password: DATABASE_CONFIG.password,
  port: DATABASE_CONFIG.port,
  driver: PostgreSqlDriver,
  highlighter: new SqlHighlighter(),
  debug: true,
  logger: logger.log.bind(logger),
  metadataProvider: TsMorphMetadataProvider,
  extensions: [EntityGenerator, Migrator, SeedManager],
  migrations: {
    tableName: 'history_migration', // name of database table with log of executed transactions
    path: './src/migrations', // path to the folder with migrations
    pattern: /^[\w-]+\d+\.ts$/, // regex pattern for the migration files
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: true, // allow to disable table and column dropping
    emit: 'ts', // migration generation mode
  },
  seeder: {
    path: './src/seeders',
    pathTs: undefined,
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
    defaultSeeder: 'DatabaseSeeder',
    glob: '!(*.d).{ts,js}',
  },
  entityGenerator: {
    skipTables: ['user'],
    path: './src/entities',
    save: true,
  },
} as Options;

export default config;
