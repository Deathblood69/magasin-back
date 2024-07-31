import { v4 as uuidv4 } from 'uuid';

export const typeProduit = {
  boissons: 'Boissons',
  snacks: 'Snacks',
  divers: 'Divers'
};

export const typeProduits = [
  {
    id: uuidv4(),
    nom: typeProduit.boissons
  },
  {
    id: uuidv4(),
    nom: typeProduit.snacks
  },
  {
    id: uuidv4(),
    nom: typeProduit.divers
  }
];
