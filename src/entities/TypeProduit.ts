import { Entity, PrimaryKey, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { AbstractEntity } from '../common/abstract/entity.abstract';

@Entity()
export class TypeProduit extends AbstractEntity {
  [PrimaryKeyProp]?: 'id';

  @Property({ columnType: 'text' })
  nom!: string;
}
