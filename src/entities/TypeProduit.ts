import { Entity, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { AbstractEntity } from '../common/abstract/entity.abstract';

@Entity()
export class TypeProduit extends AbstractEntity {
  [PrimaryKeyProp]?: 'id';

  @Property({ columnType: 'text', nullable: false, unique: true })
  nom!: string;
}
