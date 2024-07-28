import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Produit } from '../../entities/Produit';
import { produits } from './produits';
import { TypeProduit } from '../../entities/TypeProduit';

export class ProduitSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    for (const e of [Produit, TypeProduit]) {
      const entitiesInBdd = await em.findAll(e);
      if (entitiesInBdd.length > 0) await em.removeAndFlush(entitiesInBdd);
    }

    for (const produit of produits) {
      let typeProduit = await em.findOne(TypeProduit, {
        nom: produit.typeProduit.nom,
      });
      if (!typeProduit) {
        typeProduit = em.create(TypeProduit, produit.typeProduit);
        await em.persistAndFlush(typeProduit);
      }
      const newProduit = em.create(Produit, {
        ...produit,
        typeProduit: typeProduit,
      });
      await em.persistAndFlush(newProduit);
    }
  }
}
