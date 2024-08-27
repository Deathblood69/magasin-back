import { Module } from '@nestjs/common';
import { CatalogueService } from './catalogue.service';
import { JwtService } from '@nestjs/jwt';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CatalogueController } from './catalogue.controller';
import { Achat } from '../entities/Achat';
import { Produit } from '../entities/Produit';

@Module({
  imports: [MikroOrmModule.forFeature([Achat, Produit])],
  controllers: [CatalogueController],
  providers: [CatalogueService, JwtService]
})
export class CatalogueModule {}
