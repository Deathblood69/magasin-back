import { DocumentBuilder } from '@nestjs/swagger';
import { APP_CONFIG } from './app.config';

export const SWAGGER_CONFIG = new DocumentBuilder()
  .setTitle(APP_CONFIG.app.name)
  .setDescription(APP_CONFIG.app.description)
  .setVersion(APP_CONFIG.app.version)
  .build();
