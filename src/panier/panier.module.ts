import { Module } from '@nestjs/common';
import { PanierService } from './panier.service';
import { PanierController } from './panier.controller';
import { JwtService } from '@nestjs/jwt';
import { Produit } from '../entities/Produit';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Client } from '../entities/Client';

@Module({
  imports: [MikroOrmModule.forFeature([Client, Produit])],
  controllers: [PanierController],
  providers: [PanierService, JwtService]
})
export class PanierModule {}
