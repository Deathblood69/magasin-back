import { TypeProduit } from '../../entities/TypeProduit';

export enum typeProduit {
  Boissons = 'Boissons',
  Snacks = 'Snacks',
  Divers = 'Divers',
}

export const typeProduits: TypeProduit[] = [
  {
    nom: typeProduit.Boissons,
  },
  {
    nom: typeProduit.Snacks,
  },
  {
    nom: typeProduit.Boissons,
  },
];
