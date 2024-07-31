import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { TypeProduit } from '../../entities/TypeProduit';
import { typeProduits } from './typeProduits';
import { Produit } from '../../entities/Produit';

export class TypeProduitSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    for (const typeProduit of typeProduits) {
      const finded = await em.findOne(Produit, {
        typeProduit: {
          id: typeProduit.id
        }
      });
      if (!finded) {
        em.create(TypeProduit, typeProduit);
      }
    }
  }
}
