import { HttpException } from '@nestjs/common';

export class MessageException {
  static readMessage(error, entity: string) {
    const constraint = error?.detail.split('(')[1].split(')')[0];
    if (constraint)
      throw new HttpException(`${constraint} - ${error.detail}`, 409);
    else throw new HttpException(`Inconnu`, 409);
  }
}
