import pool from '../db.js'

export async function listCategories() {
  const result = await pool.query(
    'SELECT categorie_id AS id_categ, nom, description FROM categorie ORDER BY nom ASC'
  )
  return result.rows
}

export async function createCategory({ nom, description }) {
  const result = await pool.query(
    `INSERT INTO categorie (nom, description)
     VALUES ($1, $2)
     RETURNING categorie_id AS id_categ, nom, description`,
    [nom, description || null]
  )
  return result.rows[0]
}
