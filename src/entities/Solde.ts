import { Entity, OneToOne, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Client } from './Client';
import { AbstractEntity } from '../common/abstract/entity.abstract';

@Entity()
export class Solde extends AbstractEntity {
  [PrimaryKeyProp]?: 'id';

  @Property({ columnType: 'int', default: 0 })
  valeur!: number;

  @OneToOne({ mappedBy: 'solde', orphanRemoval: true })
  client!: Client;
}
