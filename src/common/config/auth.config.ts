import { JwtModuleOptions } from '@nestjs/jwt';
import { APP_CONFIG } from './app.config';

export const AUTH_CONFIG: JwtModuleOptions = {
  secret: APP_CONFIG.jwtSecret
};
