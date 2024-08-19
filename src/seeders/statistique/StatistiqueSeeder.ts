import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Statistique } from '../../entities/Statistique';
import { statistiques } from './statistiques';
import { Produit } from '../../entities/Produit';

export class StatistiqueSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    for (const statistique of statistiques) {
      const finded = await em.findOne(Produit, {
        nom: statistique.produit.nom
      });
      if (finded) {
        statistique.produit = finded;
      } else {
        const persited = em.create(Produit, statistique.produit);
        await em.persistAndFlush(persited);
      }
      const persited = em.create(Statistique, statistique);
      await em.persistAndFlush(persited);
    }
  }
}
