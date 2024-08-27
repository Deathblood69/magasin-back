import { Entity, ManyToMany, ManyToOne, Property } from '@mikro-orm/core';

import { AbstractEntity } from '../common/abstract/entity.abstract';
import { Produit } from './Produit';
import { Achat } from './Achat';

@Entity()
export class Vente extends AbstractEntity {
  @ManyToOne({
    entity: () => Produit,
    fieldName: 'produit',
    nullable: false
  })
  produit!: Produit;

  @Property({ columnType: 'date' })
  date!: Date;

  @Property({ columnType: 'int', default: 0 })
  prix!: number;

  @Property({ columnType: 'int', default: 0 })
  stock!: number;

  @ManyToMany({
    entity: () => Achat,
    fieldName: 'achat',
    nullable: true
  })
  achat!: Achat;
}
