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
  p.id_produit,
  p.nom,
  p.type,
  p.quantite,
  p.prix,
  p.description,
  p.date_creation,
  p.date_mise_a_jour,
  p.id_categorie,
  c.nom AS categorie_nom
`

app.get('/api/health', async (_request, response, next) => {
  try {
    await pool.query('SELECT 1')
    response.json({ status: 'ok', database: 'connected' })
  } catch (error) {
    next(error)
  }
})

app.get('/api/categories', async (_request, response, next) => {
  try {
    const result = await pool.query(
      'SELECT id_categ, nom, description FROM categorie ORDER BY nom ASC'
    )
    response.json(result.rows)
  } catch (error) {
    next(error)
  }
})

app.get('/api/products', async (_request, response, next) => {
  try {
    const result = await pool.query(`
      SELECT ${productFields}
      FROM produit p
      JOIN categorie c ON c.id_categ = p.id_categorie
      ORDER BY p.date_creation DESC
    `)
    response.json(result.rows)
  } catch (error) {
    next(error)
  }
})

app.post('/api/products', async (request, response, next) => {
  const { nom, type, quantite, prix, description, id_categorie } = request.body

  if (!nom || !type || quantite === undefined || prix === undefined || !id_categorie) {
    return response.status(400).json({
      error: 'Les champs nom, type, quantite, prix et id_categorie sont obligatoires.'
    })
  }

  const quantity = Number(quantite)
  const price = Number(prix)
  const categoryId = Number(id_categorie)

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
      `INSERT INTO produit (nom, type, quantite, prix, description, id_categorie)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id_produit, nom, type, quantite, prix, description,
                 date_creation, date_mise_a_jour, id_categorie`,
      [String(nom).trim(), String(type).trim(), quantity, price, description || null, categoryId]
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
