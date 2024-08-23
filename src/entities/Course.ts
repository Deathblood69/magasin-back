import { Entity, Property } from '@mikro-orm/core';

import { AbstractEntity } from '../common/abstract/entity.abstract';

@Entity()
export class Course extends AbstractEntity {
  @Property({ columnType: 'text', nullable: false, unique: true })
  nom!: string;

  @Property({ columnType: 'date' })
  date!: Date;
}
