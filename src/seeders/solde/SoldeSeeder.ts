import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Solde } from '../../entities/Solde';
import { soldes } from './soldes';
import { Client } from '../../entities/Client';

export class SoldeSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    for (const solde of soldes) {
      const finded = await em.findOne(Client, {
        solde: {
          id: solde.id
        }
      });
      if (!finded) {
        em.create(Solde, solde);
      }
    }
  }
}
