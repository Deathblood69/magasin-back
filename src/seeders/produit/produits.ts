import { typeProduits } from '../typeProduit/typeProduits';
import { v4 as uuidv4 } from 'uuid';

export const produits = [
  {
    nom: 'Coca-cola',
    prix: 8,
    stock: 100,
    typeProduit: typeProduits[0]
  },
  {
    nom: 'Chips',
    prix: 2,
    stock: 0,
    typeProduit: typeProduits[1]
  },
  {
    id: uuidv4(),
    nom: 'Ice Tea',
    prix: 2,
    stock: 0,
    typeProduit: typeProduits[0]
  }
];
