import { PrimaryKey } from '@mikro-orm/core';

export class AbstractEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;
}
