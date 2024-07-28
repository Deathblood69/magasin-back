import { registerAs } from '@nestjs/config';
import { config } from 'dotenv';

config();

export const APP_CONFIG = {
  name: 'Magasin',
  description: 'Application des gestion de stocks',
  version: '0.0.1',
  apiDocsPrefix: 'api-docs',
  port: 8080,
  jwtSecret: 'S3CR3T_K3Y',
  cookieExpirationTime: '1h',
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
    env: process.env.NODE_ENV || 'development',
    name: process.env.APP_NAME || 'nest-api',
    globalPrefix: process.env.APP_GLOBAL_PREFIX || 'api/v1',
    timeout: parseInt(process.env.APP_TIMEOUT) || 7000,
    http: {
      host: process.env.HOST_APP || '0.0.0.0',
      port: APP_CONFIG.port,
    },
    debug: Boolean(process.env.DEBUG_APP) || false,
  }),
);
