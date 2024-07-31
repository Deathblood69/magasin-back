import { typeProduits } from '../typeProduit/typeProduits';
import { v4 as uuidv4 } from 'uuid';

export const produits = [
  {
    id: uuidv4(),
    nom: 'Coca-cola',
    prix: 8,
    stock: 100,
    typeProduit: typeProduits[0],
  },
  {
    id: uuidv4(),
    nom: 'Chips',
    prix: 2,
    stock: 0,
    typeProduit: typeProduits[1],
  },
];
