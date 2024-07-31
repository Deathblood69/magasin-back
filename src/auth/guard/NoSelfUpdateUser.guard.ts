import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/entities/user.entity';

import {
  extractPayloadFromVerifiedToken,
  extractTokenFromHeader
} from '../../common/utils/tokenUtils';

import { UserService } from '../../user/user.service';

@Injectable()
export class NoSelfUpdateUserGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  /**
   * Asynchronously checks if the user can activate the route.
   *
   * @param {ExecutionContext} context - The execution context object.
   * @return {Promise<boolean>} - A promise that resolves to a boolean indicating whether the user can activate the route.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    //recupération de l'id user a modifier
    const id = req.params.id || req.body.id;

    //recupération de l'id user a connecté
    const token = extractTokenFromHeader(req);
    const { username } = extractPayloadFromVerifiedToken(
      token,
      this.jwtService
    );

    const user: User = await this.userService.findOne('username', username);

    //comparaison
    if (id === user.id) {
      throw new ForbiddenException('NO_SELF_UPDATE');
    }
    return true;
  }
}
