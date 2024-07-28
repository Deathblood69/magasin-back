import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { extractPayloadFromVerifiedToken, extractTokenFromHeader } from '../utils/tokenUtils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(    private jwtService: JwtService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {

    try {
      const req = context.switchToHttp().getRequest()

      //recupération de l'id user a connecté
      const token = extractTokenFromHeader(req)
      const {username} = extractPayloadFromVerifiedToken(token, this.jwtService)

      req.currentUser = username
    } catch (error) {
      console.log("Error", error);
      throw new BadRequestException();
    }
    return handler.handle();
  }
}
