import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import pool from './db.js'

dotenv.config()

const app = express()
const port = Number(process.env.PORT || 3001)

app.use(cors())
app.use(express.json({ limit: '1mb' }))

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

app.get('/api/health', async (_request, response, next) => {
  try {
    const connection = await pool.query(`
      SELECT
        current_database() AS database,
        current_schema() AS schema,
        inet_server_addr()::text AS server,
        inet_server_port() AS port
    `)
    const tables = await pool.query(`
      SELECT
        to_regclass('public.categorie') IS NOT NULL AS categorie_exists,
        to_regclass('public.produits') IS NOT NULL AS produits_exists
    `)

    response.json({
      status: 'ok',
      database: 'connected',
      connection: connection.rows[0],
      tables: tables.rows[0]
    })
  } catch (error) {
    next(error)
  }
})

app.get('/api/categories', async (_request, response, next) => {
  try {
    const result = await pool.query(
      'SELECT categorie_id AS id_categ, nom, description FROM categorie ORDER BY nom ASC'
    )
    response.json(result.rows)
  } catch (error) {
    next(error)
  }
})

app.post('/api/categories', async (request, response, next) => {
  const { nom, description } = request.body

  if (!nom || !String(nom).trim()) {
    return response.status(400).json({ error: 'Le nom de la catégorie est obligatoire.' })
  }

  try {
    const result = await pool.query(
      `INSERT INTO categorie (nom, description)
       VALUES ($1, $2)
       RETURNING categorie_id AS id_categ, nom, description`,
      [String(nom).trim(), description || null]
    )
    response.status(201).json(result.rows[0])
  } catch (error) {
    if (error.code === '23505') {
      return response.status(409).json({ error: 'Cette catégorie existe déjà.' })
    }
    next(error)
  }
})

app.get('/api/products', async (_request, response, next) => {
  try {
    const result = await pool.query(`
      SELECT ${productFields}
      FROM produits p
      JOIN categorie c ON c.categorie_id = p.categorie_id
      ORDER BY p.date_creation DESC
    `)
    response.json(result.rows)
  } catch (error) {
    next(error)
  }
})

app.post('/api/products', async (request, response, next) => {
  const { nom, name, type, quantite, prix, description, id_categorie, categorie_id, image } = request.body
  const productName = nom || name
  const categoryIdInput = id_categorie || categorie_id

  if (!productName || !type || quantite === undefined || prix === undefined || !categoryIdInput) {
    return response.status(400).json({
      error: 'Les champs nom, type, quantite, prix et id_categorie sont obligatoires.'
    })
  }

  const quantity = Number(quantite)
  const price = Number(prix)
  const categoryId = Number(categoryIdInput)

  if (!Number.isInteger(quantity) || quantity < 0) {
    return response.status(400).json({ error: 'La quantité doit être un entier positif ou nul.' })
  }

  if (!Number.isFinite(price) || price < 0) {
    return response.status(400).json({ error: 'Le prix doit être un nombre positif ou nul.' })
  }

  if (!Number.isInteger(categoryId) || categoryId < 1) {
    return response.status(400).json({ error: 'id_categorie doit être un identifiant valide.' })
  }

  try {
    const result = await pool.query(
      `INSERT INTO produits (name, type, "quantit‚", prix, description, categorie_id, image)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING produit_id AS id_produit, name AS nom, type,
                 "quantit‚" AS quantite, prix, description,
                 date_creation, date_mis_a_jour AS date_mise_a_jour,
                 categorie_id AS id_categorie, image`,
      [String(productName).trim(), String(type).trim(), quantity, price, description || null, categoryId, image || null]
    )

    response.status(201).json(result.rows[0])
  } catch (error) {
    if (error.code === '23503') {
      return response.status(400).json({ error: 'La catégorie indiquée n’existe pas.' })
    }
    next(error)
  }
})

app.use((error, _request, response, _next) => {
  console.error('API error:', error)
  response.status(500).json({ error: 'Une erreur interne est survenue.' })
})

app.listen(port, () => {
  console.log(`FM Soft API listening on http://localhost:${port}`)
})
