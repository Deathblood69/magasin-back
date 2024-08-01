import { soldes } from '../solde/soldes';
import { v4 as uuidv4 } from 'uuid';

export const clients = [
  {
    id: uuidv4(),
    identifiant: 'd.dupont',
    nom: 'DUPONT',
    prenom: 'David',
    solde: soldes[0]
  },
  {
    id: uuidv4(),
    identifiant: 'v.martin',
    nom: 'MARTIN',
    prenom: 'Victor',
    solde: soldes[1]
  }
];
