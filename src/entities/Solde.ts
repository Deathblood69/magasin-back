import {
  Entity,
  OneToOne,
  PrimaryKey,
  PrimaryKeyProp,
  Property,
} from '@mikro-orm/core';
import { Client } from './Client';
import { AbstractEntity } from '../common/abstract/entity.abstract';

@Entity()
export class Solde extends AbstractEntity {
  [PrimaryKeyProp]?: 'id';

  @Property({ columnType: 'text' })
  nom!: string;

  @Property({ columnType: 'int' })
  valeur!: number;

  @OneToOne({ mappedBy: 'solde', orphanRemoval: true })
  client!: Client;
}
