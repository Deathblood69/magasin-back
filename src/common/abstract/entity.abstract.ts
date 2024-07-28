import {PrimaryKey} from '@mikro-orm/core'

export class AbstractEntity {
  @PrimaryKey({columnType: 'uuid'})
  id: string
}
