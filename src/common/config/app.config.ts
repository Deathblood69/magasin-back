import { registerAs } from '@nestjs/config';
import { config } from 'dotenv';

config();

export const APP_CONFIG = {
  id: 'magasin',
  name: 'Magasin',
  description: 'Application des gestion de stocks',
  version: '0.0.1',
  apiDocsPrefix: 'api-docs',
  apiPrefix: 'api',
  port: 8080,
  jwtSecret: 'S3CR3T_K3Y',
  cookieExpirationTime: '1h',
  environment: 'development',
  timeout: 10000,
  debug: false,
  host: '0.0.0.0',
};

export const DEV_CONFIG = {
  login: 'd.dev',
  password: 'Azerty!123456',
};

interface HttpConfig {
  host: string;
  port: number;
}

export interface AppConfig {
  name: string;
  globalPrefix: string;
  env: string;
  timeout: number;
  http: HttpConfig;
  debug: boolean;
}

export default registerAs(
  'app',
  (): AppConfig => ({
    env: APP_CONFIG.environment,
    name: APP_CONFIG.name,
    globalPrefix: APP_CONFIG.apiPrefix,
    timeout: APP_CONFIG.timeout,
    http: {
      host: APP_CONFIG.host,
      port: APP_CONFIG.port,
    },
    debug: APP_CONFIG.debug,
  }),
);
