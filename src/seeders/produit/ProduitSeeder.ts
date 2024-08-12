import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Produit } from '../../entities/Produit';
import { produits } from './produits';
import { TypeProduit } from '../../entities/TypeProduit';

export class ProduitSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    for (const produit of produits) {
      const finded = await em.findOne(TypeProduit, {
        nom: produit.typeProduit.nom
      });
      if (finded) {
        produit.typeProduit = finded;
      } else {
        const persited = em.create(TypeProduit, produit.typeProduit);
        await em.persistAndFlush(persited);
      }
      const persited = em.create(Produit, produit);
      await em.persistAndFlush(persited);
    }
  }
}
