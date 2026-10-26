# FM Soft

Site vitrine e-commerce de Force Manager SOFT.

## Lancer le site en local

Dans un terminal ouvert à la racine du projet :

```bash
npm install
npm start
```

Puis ouvrir l’adresse affichée par Vite, généralement :

```text
http://127.0.0.1:5173/
```

Pour arrêter le serveur : `Ctrl + C`.

> Ne pas ouvrir `index.html` directement avec un double-clic. React/Vite doit être lancé via le serveur de développement.

## Commandes disponibles

```bash
npm run dev      # serveur de développement
npm run server   # API Express + PostgreSQL
npm run dev:server # API Express avec rechargement automatique
npm run build    # compilation de production
npm run preview  # prévisualiser la compilation
```

## Backend PostgreSQL

Le backend utilise Node.js, Express et `pg`. Copiez `.env.example` vers `.env`, adaptez `DATABASE_URL`, puis exécutez le script `server/schema.sql` dans votre base PostgreSQL locale.

```bash
Copy-Item .env.example .env
npm install
npm run server
```

L'API est disponible sur `http://localhost:3001`.

Pour vérifier que l'API utilise bien votre base PostgreSQL, appelez `GET /api/health`. La réponse indique le nom exact de la base (`connection.database`), le schéma, le serveur PostgreSQL et la présence réelle des tables `categorie` et `produits`.

L'API est compatible avec le schéma déjà créé dans votre base : table `categorie` avec `categorie_id`, et table `produits` avec `produit_id`, `name`, `categorie_id`, `image` et la colonne de quantité existante.

Le backend est organisé par responsabilité :

```text
server/
├── controllers/   # traitement des requêtes HTTP
├── middlewares/   # validation et gestion des erreurs
├── models/        # requêtes PostgreSQL
├── routes/        # définition des endpoints
├── db.js          # connexion PostgreSQL
└── index.js       # démarrage Express
```

### Créer un produit

```http
POST /api/products
Content-Type: application/json
```

```json
{
  "nom": "Écran professionnel 24 pouces",
  "type": "Matériel",
  "quantite": 10,
  "prix": 32500,
  "description": "Écran Full HD pour environnement professionnel.",
  "id_categorie": 1
}
```

La réponse `201` contient le produit enregistré. Les routes `GET /api/products`, `GET /api/categories` et `GET /api/health` sont également disponibles.

### Test Postman

Oui, un produit peut être créé avec Postman :

1. Créez ou récupérez une catégorie avec `POST /api/categories` ou `GET /api/categories`.
2. Utilisez son identifiant `id_categ` dans la requête produit.
3. Envoyez `POST http://localhost:3001/api/products` avec **Body → raw → JSON** :

```json
{
  "nom": "Écran professionnel 24 pouces",
  "type": "Matériel",
  "quantite": 10,
  "prix": 32500,
  "description": "Écran Full HD professionnel.",
  "id_categorie": 1,
  "image": "/uploads/ecran-24.jpg"
}
```

Le code `201 Created` confirme l'insertion. Refaites ensuite `GET /api/products` pour vérifier que le produit est relu depuis PostgreSQL.