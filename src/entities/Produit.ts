import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { TypeProduit } from './TypeProduit';
import { AbstractEntity } from '../common/abstract/entity.abstract';

@Entity()
export class Produit extends AbstractEntity {
  @Property({ columnType: 'text', nullable: false, unique: true })
  nom!: string;

  @Property({ columnType: 'int', default: 0 })
  prix!: number;

  @Property({ columnType: 'int', default: 0 })
  stock!: number;

  @ManyToOne({
    entity: () => TypeProduit,
    fieldName: 'typeProduit',
    nullable: false
  })
  typeProduit!: TypeProduit;
}
