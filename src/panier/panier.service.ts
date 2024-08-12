import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Client } from '../entities/Client';
import { ItemPanierDto } from './dto/itemPanier.dto';
import { EntityManager } from '@mikro-orm/core';
import { Produit } from '../entities/Produit';

@Injectable()
export class PanierService {
  constructor(private readonly entityManager: EntityManager) {}

  async valider(clientId: string, items: ItemPanierDto[]) {
    const total = items
      .map((item) => item.produit.prix * item.quantite)
      .reduce((a, b) => a + b, 0);

    await this.updateClientSolde(clientId, total);

    for (const item of items) {
      await this.updateProduitStock(item);
    }
  }

  async updateClientSolde(clientId: string, total: number) {
    const getClient = await this.entityManager.findOne(Client, {
      id: clientId
    });

    if (!getClient) {
      throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
    }

    if (getClient.solde < total) {
      throw new HttpException('Solde insuffisant', HttpStatus.BAD_REQUEST);
    }

    getClient.solde -= total;
    await this.entityManager.persistAndFlush(getClient);
  }

  async updateProduitStock(item: ItemPanierDto) {
    const produit = await this.entityManager.findOne(Produit, {
      id: item.produit.id
    });
    produit.stock -= item.quantite;
    await this.entityManager.persistAndFlush(produit);
  }
}
