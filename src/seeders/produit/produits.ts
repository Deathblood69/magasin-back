import { Produit } from '../../entities/Produit';
import { typeProduit, typeProduits } from './typeProduits';

export const produits: Produit[] = [
  {
    nom: 'Coca-cola',
    prix: 8,
    stock: 100,
    typeProduit: typeProduits.find((e) => e.nom === typeProduit.Boissons),
  },
  {
    nom: 'Chips',
    prix: 2,
    stock: 0,
    typeProduit: typeProduits.find((e) => e.nom === typeProduit.Snacks),
  },
];
