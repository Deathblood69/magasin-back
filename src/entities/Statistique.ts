import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Produit } from './Produit';

@Entity()
export class Statistique {
  @ManyToOne({
    primary: true,
    entity: () => Produit,
    fieldName: 'produit',
    nullable: false
  })
  produit!: Produit;

  @PrimaryKey()
  @Property({ columnType: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP' })
  date!: Date;

  @Property({ columnType: 'int', default: 0 })
  quantite!: number;
}
