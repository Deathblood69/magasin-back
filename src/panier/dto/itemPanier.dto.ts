import { Catalogue } from '../../catalogue/entities/catalogue.entity';

export class ItemPanierDto {
  catalogue: Catalogue;
  stock: number;
  prix: number;
}
