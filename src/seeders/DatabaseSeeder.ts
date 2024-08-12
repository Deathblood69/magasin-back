import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UserSeeder } from './user/UserSeeder';
import { ProduitSeeder } from './produit/ProduitSeeder';
import { ClientSeeder } from './client/ClientSeeder';
import { TypeProduitSeeder } from './typeProduit/TypeProduitSeeder';
import { TypeProduit } from '../entities/TypeProduit';
import { Client } from '../entities/Client';
import { Produit } from '../entities/Produit';
import { User } from '../user/entities/user.entity';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const entities = [Client, Produit, TypeProduit, User];
    for (const e of entities) {
      const entitiesInBdd = await em.findAll(e);
      if (entitiesInBdd.length > 0) await em.removeAndFlush(entitiesInBdd);
    }

    return this.call(em, [
      UserSeeder,
      TypeProduitSeeder,
      ProduitSeeder,
      ClientSeeder
    ]);
  }
}
