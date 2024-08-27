import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Client } from '../entities/Client';
import { ItemPanierDto } from './dto/itemPanier.dto';
import { EntityManager } from '@mikro-orm/core';
import { Produit } from '../entities/Produit';
import { Vente } from '../entities/Vente';

@Injectable()
export class PanierService {
  constructor(private readonly entityManager: EntityManager) {}

  async valider(clientId: string, items: ItemPanierDto[]) {
    console.log(clientId);
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

    const vente = this.entityManager.create(Vente, {
      produit,
      date: new Date(),
      prix: item.achat.prix,
      stock: item.quantite,
      achat: item.achat
    });

    await this.entityManager.persistAndFlush(vente);
  }
}
