import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_CONFIG } from './common/config/swagger.config';
import { APP_CONFIG } from './common/config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, SWAGGER_CONFIG);
  SwaggerModule.setup(APP_CONFIG.apiDocsPrefix, app, document);

  await app.listen(APP_CONFIG.port);
}

bootstrap().then();
