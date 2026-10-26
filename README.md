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