import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Client } from '../../entities/Client';
import { clients } from './clients';

export class ClientSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    for (const client of clients) {
      em.create(Client, client);
    }
  }
}
