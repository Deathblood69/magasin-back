import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Client } from '../../entities/Client';
import { clients } from './clients';
import { Solde } from '../../entities/Solde';

export class ClientSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    for (const client of clients) {
      const finded = await em.findOne(Solde, { id: client.solde.id });
      if (finded) {
        client.solde = {
          id: finded.id,
          nom: finded.nom,
          valeur: finded.valeur,
        };
      } else {
        const persited = em.create(Solde, client.solde);
        await em.persistAndFlush(persited);
      }
      em.create(Client, client);
    }
  }
}
