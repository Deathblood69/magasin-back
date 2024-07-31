import { Entity, ManyToOne, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { TypeProduit } from './TypeProduit';
import { AbstractEntity } from '../common/abstract/entity.abstract';

@Entity()
export class Produit extends AbstractEntity {
  [PrimaryKeyProp]?: 'id';

  @Property({ columnType: 'text' })
  nom!: string;

  @Property({ columnType: 'int' })
  prix!: number;

  @Property({ columnType: 'int' })
  stock!: number;

  @ManyToOne({ entity: () => TypeProduit, fieldName: 'typeProduit' })
  typeProduit!: TypeProduit;
}
