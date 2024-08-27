import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { Achat } from '../entities/Achat';
import { Catalogue } from './entities/catalogue.entity';
import { Produit } from '../entities/Produit';

@Injectable()
export class CatalogueService {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectRepository(Achat)
    private readonly achatRepository: EntityRepository<Achat>
  ) {}

  async recupererCatalogue() {
    const achats = await this.achatRepository.findAll();
    const promises = achats.map(async (e) => {
      const produit = await this.entityManager.findOne(Produit, {
        id: e.produit.id
      });
      return {
        achat: e.id,
        nom: produit.nom,
        stock: e.stock,
        prix: e.prix
      } satisfies Catalogue;
    });
    return Promise.all(promises);
  }
}
