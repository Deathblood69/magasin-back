import { Entity, ManyToOne, Property } from '@mikro-orm/core';

import { AbstractEntity } from '../common/abstract/entity.abstract';
import { Course } from './Course';
import { Produit } from './Produit';

@Entity()
export class Achat extends AbstractEntity {
  @ManyToOne({
    entity: () => Course,
    fieldName: 'course',
    nullable: false
  })
  course!: Course;

  @ManyToOne({
    entity: () => Produit,
    fieldName: 'produit',
    nullable: false
  })
  produit!: Produit;

  @Property({ columnType: 'int', default: 0 })
  prix!: number;

  @Property({ columnType: 'int', default: 0 })
  stock!: number;
}
