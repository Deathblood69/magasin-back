import { Entity, Property } from '@mikro-orm/core';
import { AbstractEntity } from '../common/abstract/entity.abstract';

@Entity()
export class Client extends AbstractEntity {
  @Property({ columnType: 'text', nullable: false })
  nom!: string;

  @Property({ columnType: 'text', nullable: false })
  prenom!: string;

  @Property({ columnType: 'numeric', nullable: false, default: 0 })
  solde!: number;
}
