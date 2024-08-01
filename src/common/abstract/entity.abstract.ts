import { PrimaryKey, SerializedPrimaryKey } from '@mikro-orm/core';

export class AbstractEntity {
  @PrimaryKey({ columnType: 'uuid' })
  @SerializedPrimaryKey()
  id: string;
}
