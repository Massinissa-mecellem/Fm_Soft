CREATE TABLE IF NOT EXISTS categorie (
  id_categ SERIAL PRIMARY KEY,
  nom VARCHAR(120) NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE IF NOT EXISTS client (
  id_client SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  mot_de_pass TEXT NOT NULL,
  telephone VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS produit (
  id_produit SERIAL PRIMARY KEY,
  nom VARCHAR(180) NOT NULL,
  type VARCHAR(80) NOT NULL,
  quantite INTEGER NOT NULL DEFAULT 0 CHECK (quantite >= 0),
  prix NUMERIC(12, 2) NOT NULL CHECK (prix >= 0),
  description TEXT,
  date_creation TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  date_mise_a_jour TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_categorie INTEGER NOT NULL REFERENCES categorie(id_categ) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS commande (
  id_commande SERIAL PRIMARY KEY,
  nom VARCHAR(180) NOT NULL,
  statut VARCHAR(40) NOT NULL DEFAULT 'en_attente',
  date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_client INTEGER NOT NULL REFERENCES client(id_client) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS produit_commander (
  id_produit INTEGER NOT NULL REFERENCES produit(id_produit) ON UPDATE CASCADE ON DELETE RESTRICT,
  id_commande INTEGER NOT NULL REFERENCES commande(id_commande) ON UPDATE CASCADE ON DELETE CASCADE,
  quantite INTEGER NOT NULL CHECK (quantite > 0),
  PRIMARY KEY (id_produit, id_commande)
);

CREATE INDEX IF NOT EXISTS produit_categorie_idx ON produit(id_categorie);
CREATE INDEX IF NOT EXISTS commande_client_idx ON commande(id_client);

INSERT INTO categorie (nom, description) VALUES
  ('Imprimante & scanner', 'Imprimantes, scanners et solutions de numérisation.'),
  ('Ordinateur & PC portable', 'Ordinateurs fixes, PC portables et terminaux.'),
  ('Stockages', 'Disques durs, SSD et solutions de sauvegarde.'),
  ('Composants', 'Composants et pièces pour ordinateurs.'),
  ('Périphérique', 'Claviers, souris, lecteurs et accessoires.'),
  ('Écrans et moniteur', 'Écrans professionnels et moniteurs.'),
  ('Commercial', 'Logiciels de gestion commerciale.'),
  ('Santé', 'Logiciels pour cabinets et établissements de santé.'),
  ('Service', 'Logiciels de gestion des services et interventions.'),
  ('Éducation', 'Logiciels pour écoles et établissements de formation.'),
  ('Sécurité & antivirus', 'Solutions de sécurité et de protection informatique.')
ON CONFLICT (nom) DO NOTHING;
