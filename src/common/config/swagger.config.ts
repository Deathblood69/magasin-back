import { DocumentBuilder } from '@nestjs/swagger';
import { APP_CONFIG } from './app.config';

export const SWAGGER_CONFIG = new DocumentBuilder()
  .setTitle(APP_CONFIG.name)
  .setDescription(APP_CONFIG.description)
  .setVersion(APP_CONFIG.version)
  .build();
