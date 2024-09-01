import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { Achat } from '../entities/Achat';
import { Catalogue } from './entities/catalogue.entity';
import { Produit } from '../entities/Produit';
import { Vente } from '../entities/Vente';

@Injectable()
export class CatalogueService {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectRepository(Achat)
    private readonly achatRepository: EntityRepository<Achat>
  ) {}

  async recupererCatalogue() {
    const achats = await this.achatRepository.findAll();

    const promises = achats.map(async (achat) => {
      const produit = await this.entityManager.findOne(Produit, {
        id: achat.produit.id
      });
      const ventes = await this.entityManager.find(Vente, {
        achat: achat
      });
      const stockVentes = ventes.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.stock;
      }, 0);
      return {
        achat: achat.id,
        nom: produit.nom,
        stock: achat.stock - stockVentes,
        prix: achat.prix
      } satisfies Catalogue;
    });
    return Promise.all(promises);
  }
}
