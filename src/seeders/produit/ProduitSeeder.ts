import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Produit } from '../../entities/Produit';
import { produits } from './produits';
import { TypeProduit } from '../../entities/TypeProduit';

export class ProduitSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    for (const produit of produits) {
      const finded = await em.findOne(TypeProduit, {
        id: produit.typeProduit.id,
      });
      if (finded) {
        produit.typeProduit = {
          id: finded.id,
          nom: finded.nom,
        };
      } else {
        const persited = em.create(TypeProduit, produit.typeProduit);
        await em.persistAndFlush(persited);
      }
      em.create(Produit, produit);
    }
  }
}
