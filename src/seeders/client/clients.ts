import { soldes } from '../solde/soldes';
import { v4 as uuidv4 } from 'uuid';

export const clients = [
  {
    id: uuidv4(),
    identifiant: 'r.diasparra',
    nom: 'DIASPARRA',
    prenom: 'Romain',
    solde: soldes[0]
  }
];
