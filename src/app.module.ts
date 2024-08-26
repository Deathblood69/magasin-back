import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AUTH_CONFIG } from './common/config/auth.config';
import { AuthModule } from './auth/auth.module';
import configs from 'src/common/config/index';
import { GenericController } from './common/genericModule/controller/generic.controller';
import { RefreshTokenMiddleware } from './common/middleware/refresh-token.middleware';
import { ReferenceModule } from './reference/reference.module';
import { PanierModule } from './panier/panier.module';
import { BeneficeModule } from './benefice/benefice.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register(AUTH_CONFIG),
    AuthModule,
    UserModule,
    ReferenceModule,
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true
    }),
    MikroOrmModule.forRoot(),
    PanierModule,
    BeneficeModule
  ],
  controllers: [GenericController],
  providers: [],
  exports: [JwtModule]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RefreshTokenMiddleware).exclude('auth/(.*)').forRoutes('*');
  }
}
