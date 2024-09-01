import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ItemPanierDto } from './dto/itemPanier.dto';
import { EntityManager } from '@mikro-orm/core';
import { Vente } from '../entities/Vente';
import { Achat } from '../entities/Achat';
import { Client } from '../entities/Client';

@Injectable()
export class PanierService {
  constructor(private readonly em: EntityManager) {}

  async valider(clientId: string, items: ItemPanierDto[]) {
    let total = 0;
    for (const item of items) {
      const achat = await this.em.findOne(Achat, {
        id: item.catalogue.achat
      });
      const vente = this.em.create(Vente, {
        produit: achat.produit,
        achat: achat,
        stock: item.stock,
        prix: item.prix,
        date: new Date()
      });
      await this.em.persistAndFlush(vente);
      total += item.prix * item.stock;
    }
    await this.updateClientSolde(clientId, total);
  }

  async updateClientSolde(clientId: string, total: number) {
    const getClient = await this.em.findOne(Client, {
      id: clientId
    });

    if (!getClient) {
      throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
    }

    if (getClient.solde < total) {
      throw new HttpException('Solde insuffisant', HttpStatus.BAD_REQUEST);
    }

    getClient.solde -= total;
    await this.em.persistAndFlush(getClient);
  }
}
