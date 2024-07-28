import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserRole } from 'src/user/enum/user.role.enum';

@Injectable()
export class ReferenceService {
  private enumMap: Map<string, any> = new Map();

  constructor() {
    this.enumMap.set('UserRole', UserRole);
  }

  find(refString: string) {
    if (Array.from(this.enumMap.keys()).includes(refString)) {
      return Object.values(this.enumMap.get(refString));
    } else {
      throw new NotAcceptableException(
        `${refString} n'est pas une référence disponible`,
      );
    }
  }
}
