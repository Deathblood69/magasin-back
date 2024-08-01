import { Entity, OneToOne, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Solde } from './Solde';
import { AbstractEntity } from '../common/abstract/entity.abstract';

@Entity()
export class Client extends AbstractEntity {
  [PrimaryKeyProp]?: 'id';

  @Property({ columnType: 'text', nullable: false, unique: true })
  identifiant!: string;

  @Property({ columnType: 'text', nullable: false })
  nom!: string;

  @Property({ columnType: 'text', nullable: false })
  prenom!: string;

  @OneToOne(() => Solde, (solde) => solde.client, { owner: true })
  solde!: Solde;
}
