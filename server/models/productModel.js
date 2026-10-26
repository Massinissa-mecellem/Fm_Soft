import pool from '../db.js'

const productFields = `
  p.produit_id AS id_produit,
  p.name AS nom,
  p.type,
  p."quantit‚" AS quantite,
  p.prix,
  p.description,
  p.date_creation,
  p.date_mis_a_jour AS date_mise_a_jour,
  p.categorie_id AS id_categorie,
  c.nom AS categorie_nom,
  p.image
`

export async function listProducts() {
  const result = await pool.query(`
    SELECT ${productFields}
    FROM produits p
    JOIN categorie c ON c.categorie_id = p.categorie_id
    ORDER BY p.date_creation DESC
  `)
  return result.rows
}

export async function createProduct(product) {
  const result = await pool.query(
    `INSERT INTO produits (name, type, "quantit‚", prix, description, categorie_id, image, date_creation, date_mis_a_jour)
     VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
     RETURNING produit_id AS id_produit, name AS nom, type,
               "quantit‚" AS quantite, prix, description,
               date_creation, date_mis_a_jour AS date_mise_a_jour,
               categorie_id AS id_categorie, image`,
    [
      product.name,
      product.type,
      product.quantity,
      product.price,
      product.description || '',
      product.categoryId,
      product.image || null
    ]
  )
  return result.rows[0]
}
