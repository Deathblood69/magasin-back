import {
  Entity,
  ManyToOne,
  PrimaryKey,
  PrimaryKeyProp,
  Property,
} from '@mikro-orm/core';
import { TypeProduit } from './TypeProduit';

@Entity()
export class Produit {
  [PrimaryKeyProp]?: 'nom';

  @PrimaryKey({ columnType: 'text' })
  nom!: string;

  @Property({ columnType: 'int' })
  prix!: number;

  @Property({ columnType: 'bigint' })
  stock!: number;

  @ManyToOne({ entity: () => TypeProduit, fieldName: 'typeProduit' })
  typeProduit!: TypeProduit;
}
