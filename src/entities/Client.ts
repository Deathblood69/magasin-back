import {
  Entity,
  OneToOne,
  PrimaryKey,
  PrimaryKeyProp,
  Property
} from '@mikro-orm/core';
import { Solde } from './Solde';
import { AbstractEntity } from '../common/abstract/entity.abstract';

@Entity()
export class Client extends AbstractEntity {
  [PrimaryKeyProp]?: 'id';

  @Property({ columnType: 'text' })
  identifiant!: string;

  @Property({ columnType: 'text' })
  nom!: string;

  @Property({ columnType: 'text' })
  prenom!: string;

  @OneToOne(() => Solde, (solde) => solde.client, { owner: true })
  solde!: Solde;
}
