## Description

Application backend de gestion d'un magasin

## Installation

Installation des dépendances

```bash
npm install
```

Création de l'image de la base de données

```bash
docker build -f database.dockerfile -t magasin-database
```

Mise à jour des tables de la base de données
```bash
npm run migration:run
```

Ajout des données
```bash
npm seeders:generate
```

Création de l'image du backend

```bash
docker build -t magasin-back .
```

## Running the app

```bash
docker start magasin-database
```



```bash
npm run start:dev
```

## Déploiement

Déploiement du backend et de la base de données

```bash
docker compose up -d
```
