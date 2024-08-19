import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_CONFIG } from './common/config/swagger.config';
import { APP_CONFIG, AppConfig } from './common/config/app.config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';

async function bootstrap() {
  const currentLogger = new Logger();
  const logger = {
    logger: WinstonModule.createLogger({
      transports: [
        // file on daily rotation (error only)
        new transports.DailyRotateFile({
          // %DATE will be replaced by the current date
          filename: `logs/%DATE%-error.log`,
          level: 'error',
          format: format.combine(format.timestamp(), format.json()),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false // don't want to zip our logs
        }),
        // same for all levels
        new transports.DailyRotateFile({
          filename: `logs/%DATE%-combined.log`,
          format: format.combine(format.timestamp(), format.json()),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false
        }),
        new transports.Console({
          format: format.combine(
            format.cli(),
            format.splat(),
            format.timestamp(),
            format.printf((info) => {
              return `${info.timestamp} ${info.level}: ${info.message}`;
            })
          )
        })
      ]
    })
  };
  const app = await NestFactory.create(AppModule, logger);
  app.enableCors();
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');

  app.setGlobalPrefix(appConfig.globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true
    })
  );

  const document = SwaggerModule.createDocument(app, SWAGGER_CONFIG);
  SwaggerModule.setup(APP_CONFIG.app.apiDocsPrefix, app, document);

  app.setGlobalPrefix(appConfig.globalPrefix);
  const server = await app.listen(appConfig.http.port, appConfig.http.host);
  if (appConfig.env === 'production') {
    server.setTimeout(appConfig.timeout);
  }

  currentLogger.debug(`Server environment set to ${appConfig.env}`);
  currentLogger.debug(`Server running on ${await app.getUrl()}`);

  app.use(cookieParser());
}

bootstrap().then();
