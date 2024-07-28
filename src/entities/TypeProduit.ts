import { Entity, PrimaryKey, PrimaryKeyProp } from '@mikro-orm/core';

@Entity()
export class TypeProduit {
  [PrimaryKeyProp]?: 'nom';

  @PrimaryKey({ columnType: 'text' })
  nom!: string;
}
