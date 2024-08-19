import { registerAs } from '@nestjs/config';
import { config } from 'dotenv';
import * as process from 'node:process';

config();

export const APP_CONFIG = {
  app: {
    name: process.env.APP_NAME ?? 'Magasin',
    description:
      process.env.APP_DESCRIPTION ?? 'Application des gestion de stocks',
    version: process.env.APP_VERSION ?? '0.0.1',
    apiDocsPrefix: process.env.APP_API_DOCS_PREFIX ?? 'api-docs',
    apiPrefix: process.env.APP_API_PREFIX ?? 'api',
    port: process.env.APP_PORT ?? '8080'
  },
  database: {
    host: process.env.DB_HOST ?? 'localhost',
    name: process.env.DB_NAME ?? 'magasin',
    port: parseInt(process.env.DB_PORT) ?? 5432,
    user: process.env.DB_USER ?? 'magasin',
    password: process.env.DB_PASSWORD ?? 'magasin'
  },
  jwtSecret: process.env.APP_JWT_SECRET ?? 'secret-key',
  cookieExpirationTime: process.env.APP_COOKIE_EXPIRATION_TIME ?? '1h',
  environment: process.env.APP_ENVIRONMENT ?? 'development',
  timeout: process.env.APP_TIMEOUT ?? '5000',
  timeban: process.env.APP_TIMEBAN ?? '5',
  debug: process.env.APP_DEBUG ?? 'false',
  host: process.env.APP_HOST ?? '0.0.0.0'
};

export const DEV_CONFIG = {
  login: 'd.dev',
  password: 'Azerty!123456'
};

export interface AppConfig {
  name: string;
  globalPrefix: string;
  env: string;
  timeout: number;
  http: HttpConfig;
  debug: boolean;
}

interface HttpConfig {
  host: string;
  port: number;
}

export default registerAs(
  'app',
  (): AppConfig => ({
    env: APP_CONFIG.environment,
    name: APP_CONFIG.app.name,
    globalPrefix: APP_CONFIG.app.apiPrefix,
    timeout: parseInt(APP_CONFIG.timeout),
    http: {
      host: APP_CONFIG.host,
      port: parseInt(APP_CONFIG.app.port, 10)
    },
    debug: APP_CONFIG.debug.toLowerCase() === 'true'
  })
);
