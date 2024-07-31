import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor
} from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import {
  extractPayloadFromVerifiedToken,
  extractTokenFromHeader
} from '../utils/tokenUtils';
import { Request } from 'express';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Intercepte les requetes afin de logger les access aux classes utilisant cet intercepteur.
   * log sous le format {"context":"{CLASS}","level":"{LEVEL}","message":"{USERNAME} - {GET/POST/...} - {STATUS} - [URL] -  {TIME RESPONSE}","timestamp":"{DATE}"}
   * @param context
   * @param next
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;
    const now = Date.now();
    const user = this.getUSer(req);
    return next.handle().pipe(
      map((data) => {
        Logger.log(
          `${user} - ${method} - ${context.switchToHttp().getResponse().statusCode} - ${url} -  ${Date.now() - now}ms`,
          context.getClass().name
        );
        return data;
      }),
      catchError((err) => {
        Logger.error(
          `${user} - ${method} - ${err} - ${url} -  ${Date.now() - now}ms`,
          context.getClass().name
        );
        throw err;
      })
    );
  }

  /**
   * Extrait le username du token de la requete.
   *
   * @param {Request} req - the request object
   * @return {string} the username extracted from the request
   */
  private getUSer(req: Request) {
    try {
      const token = extractTokenFromHeader(req);
      const { username } = extractPayloadFromVerifiedToken(
        token,
        this.jwtService
      );

      return username;
    } catch {
      return req.body.username;
    }
  }
}
